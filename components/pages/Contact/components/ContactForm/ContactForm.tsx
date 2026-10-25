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
function writeContactSubmission(payload: FormFields): Promise<Response> {
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

  // Shared field styling. .form-input owns colour, border and focus state.
  const fieldClass = "p-2 border-b bg-transparent form-input";
  const labelClass = "font-semibold text-sm";
  const helperClass = "text-xs text-(--muted)";
  const errorClass = "text-(--error) font-bold text-xs";

  // Only wire aria-describedby when an error is actually on screen.
  const describedBy = (name: keyof FormFields) =>
    touched[name] && errors[name] ? `${name}-error` : undefined;

  const isInvalid = (name: keyof FormFields) =>
    Boolean(touched[name] && errors[name]);

  return (
    <div className="w-full px-4 sm:px-6 py-6 max-w-2xl mx-auto">
      <div className="bg-background border border-(--border) rounded-2xl shadow-sm p-6 sm:p-8 md:p-10">
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Full Name */}
          <div
            className="flex flex-col gap-1"
            role="group"
            aria-labelledby="fullName-label"
          >
            <span id="fullName-label" className={labelClass}>
              {t("labels.fullName")}{" "}
              <span className="text-(--error)" aria-hidden="true">
                *
              </span>
            </span>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* First Name */}
              <div className="flex flex-col gap-1 flex-1">
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  value={fields.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t("placeholders.firstName")}
                  aria-required="true"
                  aria-invalid={isInvalid("firstName")}
                  aria-describedby={describedBy("firstName")}
                  className={fieldClass}
                />
                <label htmlFor="firstName" className={helperClass}>
                  {t("labels.firstName")}
                </label>
                {touched.firstName && errors.firstName && (
                  <p id="firstName-error" role="alert" className={errorClass}>
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-1 flex-1">
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  value={fields.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t("placeholders.lastName")}
                  aria-required="true"
                  aria-invalid={isInvalid("lastName")}
                  aria-describedby={describedBy("lastName")}
                  className={fieldClass}
                />
                <label htmlFor="lastName" className={helperClass}>
                  {t("labels.lastName")}
                </label>
                {touched.lastName && errors.lastName && (
                  <p id="lastName-error" role="alert" className={errorClass}>
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className={labelClass}>
              {t("labels.email")}{" "}
              <span className="text-(--error)" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              value={fields.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={t("placeholders.email")}
              aria-required="true"
              aria-invalid={isInvalid("email")}
              aria-describedby={describedBy("email")}
              className={fieldClass}
            />
            {touched.email && errors.email && (
              <p id="email-error" role="alert" className={errorClass}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className={labelClass}>
              {t("labels.phone")}
              <span className="text-(--muted) font-normal ml-1">
                ({t("labels.optional")})
              </span>
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              value={fields.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={t("placeholders.phone")}
              aria-invalid={isInvalid("phone")}
              aria-describedby={describedBy("phone")}
              className={fieldClass}
            />
            {touched.phone && errors.phone && (
              <p id="phone-error" role="alert" className={errorClass}>
                {errors.phone}
              </p>
            )}
          </div>

          {/* Service Required */}
          <div className="flex flex-col gap-1">
            <label htmlFor="service" className={labelClass}>
              {t("labels.service")}{" "}
              <span className="text-(--error)" aria-hidden="true">
                *
              </span>
            </label>
            {/* appearance-none removes the native arrow, so supply our own */}
            <div className="relative">
              <select
                id="service"
                name="service"
                value={fields.service}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-required="true"
                aria-invalid={isInvalid("service")}
                aria-describedby={describedBy("service")}
                className={`${fieldClass} appearance-none hover:cursor-pointer w-full pr-8`}
              >
                <option value="" disabled>
                  {t("placeholders.service")}
                </option>
                <option value="documentary">
                  {t("serviceOptions.documentary")}
                </option>
                <option value="speaking">{t("serviceOptions.speaking")}</option>
              </select>
              <svg
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" />
              </svg>
            </div>
            {touched.service && errors.service && (
              <p id="service-error" role="alert" className={errorClass}>
                {errors.service}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className={labelClass}>
              {t("labels.message")}{" "}
              <span className="text-(--error)" aria-hidden="true">
                *
              </span>
            </label>
            <textarea
              id="message"
              name="message"
              value={fields.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={t("placeholders.message")}
              rows={5}
              aria-required="true"
              aria-invalid={isInvalid("message")}
              aria-describedby={describedBy("message")}
              className={`${fieldClass} resize-none`}
            />
            {touched.message && errors.message && (
              <p id="message-error" role="alert" className={errorClass}>
                {errors.message}
              </p>
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
              bg-foreground
              text-background
              font-semibold
              w-full
              hover:cursor-pointer
              hover:opacity-90
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-(--foreground)
              disabled:bg-gray-500
              disabled:text-white
              disabled:opacity-100
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
        <div aria-live="polite">
          {submitStatus === "success" && (
            <p className="mt-4 text-sm text-(--success) font-semibold">
              {t("status.success")}
            </p>
          )}
          {submitStatus === "error" && (
            <p className="mt-4 text-sm text-(--error) font-semibold">
              {t("status.error")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
