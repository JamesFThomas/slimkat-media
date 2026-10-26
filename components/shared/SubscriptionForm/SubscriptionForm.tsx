"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export const SubscriptionForm = () => {
  const t = useTranslations("SubscriptionForm");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [touched, setTouched] = useState({
    email: false,
  });

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const valuesAreValid = !emailError && emailPattern.test(email);

  const resetSubmitStatus = () => {
    setTimeout(() => {
      setSubmitStatus("idle");
    }, 5000);
  };

  const clearForm = () => {
    setEmail("");
    setEmailError("");
    setTouched({ email: false });
  };

  const validateEmail = (email: string) => {
    let validated = true;

    if (email.trim() === "") {
      setEmailError(t("errors.emailRequired"));
      validated = false;
    } else if (!emailPattern.test(email)) {
      setEmailError(t("errors.emailInvalid"));
      validated = false;
    } else {
      setEmailError("");
    }
    return validated;
  };

  const handleBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));
    validateEmail(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (touched.email) {
      validateEmail(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validated = validateEmail(email);
    if (!validated) return;

    try {
      setSubmitStatus("loading");

      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        console.log("Form submitted successfully:", result);

        setSubmitStatus("success");

        resetSubmitStatus();

        clearForm();

        // trigger confirmation email API call here
        await fetch("/api/subscription-confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
      } else {
        console.error("Form submission failed:", result);

        clearForm();

        setSubmitStatus("error");

        resetSubmitStatus();
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      clearForm();

      setSubmitStatus("error");

      resetSubmitStatus();
    }
  };

  // Shared styling. .form-input owns colour, border and focus state.
  const errorClass = "text-(--error) font-bold text-sm mt-1";
  const statusClass = "mt-2 text-sm font-semibold";

  return (
    <div className="flex flex-col">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div id="form-input-container" className="flex flex-row w-full">
          <input
            id="email-input"
            className="p-2 border grow rounded-l-md border-r-0 hover:cursor-pointer bg-transparent form-input"
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => handleBlur()}
            onFocus={() => setTouched((prev) => ({ ...prev, email: true }))}
            placeholder={t("placeholders.email")}
          />
          <button
            id="subscribe-button"
            type="submit"
            disabled={!valuesAreValid || submitStatus === "loading"}
            className="
            p-2
            rounded-r-md
            border-l-0
            bg-foreground
            text-background
            font-semibold
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
            {t("labels.submit")}
          </button>
        </div>
        <div id="email-error-container">
          {touched.email && emailError && (
            <p className={errorClass}>{emailError}</p>
          )}
        </div>
      </form>

      {submitStatus === "loading" && (
        <p className={`${statusClass} text-(--muted)`}>{t("status.loading")}</p>
      )}

      {submitStatus === "success" && (
        <p className={`${statusClass} text-(--success)`}>
          {t("status.success")}
        </p>
      )}

      {submitStatus === "error" && (
        <p className={`${statusClass} text-(--error)`}>
          {t("status.error")}
        </p>
      )}
    </div>
  );
};
