"use client";

import { useState } from "react";

export const SubscriptionForm = () => {
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
      setEmailError("Email is required");
      validated = false;
    } else if (!emailPattern.test(email)) {
      setEmailError("email@address.com format is required");
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

  return (
    <div className="flex flex-col">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div id="form-input-container" className="flex flex-row w-full">
          <input
            id="email input"
            className="p-2 border grow rounded-l-md border-r-0 hover:cursor-pointer bg-transparent form-input"
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => handleBlur()}
            onFocus={() => setTouched((prev) => ({ ...prev, email: true }))}
            placeholder="Enter your email"
          />
          <button
            id="subscribe button"
            type="submit"
            disabled={!valuesAreValid || submitStatus === "loading"}
            className="
            p-2
            rounded-r-md
            border-l-0
            text-white
            bg-black
            hover:cursor-pointer
            disabled:bg-gray-400
            disabled:cursor-not-allowed
            "
          >
            Subscribe
          </button>
        </div>
        <div id="email-error-container">
          {touched.email && emailError && (
            <p className="text-red-800 font-bold text-sm mt-1">{emailError}</p>
          )}
        </div>
      </form>

      {submitStatus === "loading" && (
        <p className="mt-2 text-sm text-blue-700">Submitting...</p>
      )}

      {submitStatus === "success" && (
        <p className="mt-2 text-sm text-green-700">Thanks for subscribing!</p>
      )}

      {submitStatus === "error" && (
        <p className="mt-2 text-sm text-red-700">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
};
