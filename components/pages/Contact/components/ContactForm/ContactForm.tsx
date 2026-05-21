"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

type ServiceOption = "documentary" | "speaking" | "";

interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: ServiceOption;
  message: string;
}

interface FormErrors {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormTouched {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  phone: boolean;
  service: boolean;
  message: boolean;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

// ─── Isolated data-writing layer ─────────────────────────────────────────────
// Swap this function's internals when migrating from Google Sheets → Azure DB.
// The rest of the form never needs to change.
async function writeContactSubmission(payload: FormFields): Promise<Response> {
  return fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
// ─────────────────────────────────────────────────────────────────────────────

export const ContactForm = () => {
  const t = useTranslations("ContactForm");
  const searchParams = useSearchParams();

  // Read the param once before state initializes
  const serviceParam = searchParams.get("service") as ServiceOption | null;
  const initialService: ServiceOption =
    serviceParam === "documentary" || serviceParam === "speaking"
      ? serviceParam
      : "";

  const packageParam = searchParams.get("package");
  const initialMessage = packageParam
    ? `I am interested in the ${packageParam} package and would like to learn more.`
    : "";

  // Pre-fill service from query param e.g. /contact?service=documentary
  const initialFields: FormFields = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: initialService, // pre-filled from query param
    message: initialMessage,
  };

  const initialErrors: FormErrors = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  };

  const initialTouched: FormTouched = {
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    service: false,
    message: false,
  };

  const [fields, setFields] = useState<FormFields>(initialFields);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [touched, setTouched] = useState<FormTouched>(initialTouched);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // ─── Validators ────────────────────────────────────────────────────────────

  const validateField = (name: keyof FormFields, value: string): string => {
    switch (name) {
      case "firstName":
        return value.trim() === "" ? t("errors.firstNameRequired") : "";
      case "lastName":
        return value.trim() === "" ? t("errors.lastNameRequired") : "";
      case "email":
        if (value.trim() === "") return t("errors.emailRequired");
        if (!emailPattern.test(value)) return t("errors.emailInvalid");
        return "";
      case "phone":
        if (value.trim() !== "" && !phonePattern.test(value))
          return t("errors.phoneInvalid");
        return "";
      case "service":
        return value === "" ? t("errors.serviceRequired") : "";
      case "message":
        return value.trim() === "" ? t("errors.messageRequired") : "";
      default:
        return "";
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {
      firstName: validateField("firstName", fields.firstName),
      lastName: validateField("lastName", fields.lastName),
      email: validateField("email", fields.email),
      phone: validateField("phone", fields.phone),
      service: validateField("service", fields.service),
      message: validateField("message", fields.message),
    };
    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      service: true,
      message: true,
    });
    return Object.values(newErrors).every((e) => e === "");
  };

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));

    if (touched[name as keyof FormTouched]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name as keyof FormFields, value),
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name as keyof FormFields, value),
    }));
  };

  const clearForm = () => {
    setFields(initialFields);
    setErrors(initialErrors);
    setTouched(initialTouched);
  };

  const resetSubmitStatus = () => {
    setTimeout(() => setSubmitStatus("idle"), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateAll();
    if (!isValid) return;

    try {
      setSubmitStatus("loading");

      const response = await writeContactSubmission(fields);
      const result = await response.json();

      if (response.ok && result.status === "success") {
        setSubmitStatus("success");
        clearForm();
        resetSubmitStatus();

        // Trigger confirmation email
        await fetch("/api/contact-confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: fields.email,
            firstName: fields.firstName,
            service: fields.service,
          }),
        });
      } else {
        setSubmitStatus("error");
        resetSubmitStatus();
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitStatus("error");
      resetSubmitStatus();
    }
  };

  const isFormValid =
    !errors.firstName &&
    !errors.lastName &&
    !errors.email &&
    !errors.phone &&
    !errors.service &&
    !errors.message &&
    fields.firstName.trim() !== "" &&
    fields.lastName.trim() !== "" &&
    fields.email.trim() !== "" &&
    fields.service !== "" &&
    fields.message.trim() !== "";

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="w-full px-4 sm:px-6 py-6 max-w-2xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 md:p-10">
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">
              {t("labels.fullName")} <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* First Name */}
              <div className="flex flex-col gap-1 flex-1">
                <input
                  type="text"
                  name="firstName"
                  value={fields.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t("placeholders.firstName")}
                  className="p-2 border-b border-gray-400 focus:border-black outline-none bg-transparent"
                />
                <span className="text-xs text-gray-500">
                  {t("labels.firstName")}
                </span>
                {touched.firstName && errors.firstName && (
                  <p className="text-red-700 font-bold text-xs">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-1 flex-1">
                <input
                  type="text"
                  name="lastName"
                  value={fields.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t("placeholders.lastName")}
                  className="p-2 border-b border-gray-400 focus:border-black outline-none bg-transparent"
                />
                <span className="text-xs text-gray-500">
                  {t("labels.lastName")}
                </span>
                {touched.lastName && errors.lastName && (
                  <p className="text-red-700 font-bold text-xs">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">
              {t("labels.email")} <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={fields.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={t("placeholders.email")}
              className="p-2 border-b border-gray-400 focus:border-black outline-none bg-transparent"
            />
            {touched.email && errors.email && (
              <p className="text-red-700 font-bold text-xs">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">
              {t("labels.phone")}
              <span className="text-gray-400 font-normal ml-1">
                ({t("labels.optional")})
              </span>
            </label>
            <input
              type="tel"
              name="phone"
              value={fields.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={t("placeholders.phone")}
              className="p-2 border-b border-gray-400 focus:border-black outline-none bg-transparent"
            />
            {touched.phone && errors.phone && (
              <p className="text-red-700 font-bold text-xs">{errors.phone}</p>
            )}
          </div>

          {/* Service Required */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">
              {t("labels.service")} <span className="text-red-600">*</span>
            </label>
            <select
              name="service"
              value={fields.service}
              onChange={handleChange}
              onBlur={handleBlur}
              className="p-2 border-b border-gray-400 focus:border-black outline-none bg-transparent appearance-none hover:cursor-pointer"
            >
              <option value="" disabled>
                {t("placeholders.service")}
              </option>
              <option value="documentary">
                {t("serviceOptions.documentary")}
              </option>
              <option value="speaking">{t("serviceOptions.speaking")}</option>
            </select>
            {touched.service && errors.service && (
              <p className="text-red-700 font-bold text-xs">{errors.service}</p>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">
              {t("labels.message")} <span className="text-red-600">*</span>
            </label>
            <textarea
              name="message"
              value={fields.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={t("placeholders.message")}
              rows={5}
              className="p-2 border-b border-gray-400 focus:border-black outline-none bg-transparent resize-none"
            />
            {touched.message && errors.message && (
              <p className="text-red-700 font-bold text-xs">{errors.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid || submitStatus === "loading"}
            className="
              mt-2
              p-3
              rounded-md
              text-white
              bg-black
              font-semibold
              w-full
              hover:cursor-pointer
              disabled:bg-gray-400
              disabled:cursor-not-allowed
              transition-colors
            "
          >
            {submitStatus === "loading"
              ? t("status.loading")
              : t("labels.submit")}
          </button>
        </form>

        {/* Status messages */}
        {submitStatus === "success" && (
          <p className="mt-4 text-sm text-green-700 font-semibold">
            {t("status.success")}
          </p>
        )}
        {submitStatus === "error" && (
          <p className="mt-4 text-sm text-red-700 font-semibold">
            {t("status.error")}
          </p>
        )}
      </div>
    </div>
  );
};
