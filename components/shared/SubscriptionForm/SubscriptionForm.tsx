'use client';

import { useState } from 'react';

export const SubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [touched, setTouched] = useState({
    email: false,
  });
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const valuesAreValid = !emailError && emailPattern.test(email);

  const googleSheetsEndpoint =
    'https://script.google.com/macros/s/AKfycbwNkUrUt_Fl4KZ_f1pPD42nnk6jqjzVWQcSaqMy38zNV-g7-_V_sAicNPeU4uOHRMatMA/exec';

  const validateEmail = (email: string) => {
    let validated = true;

    if (email.trim() === '') {
      setEmailError('Email is required');
      validated = false;
    } else if (!emailPattern.test(email)) {
      setEmailError('email@address.com format is required');
      validated = false;
    } else {
      setEmailError('');
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
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        console.log('Form submitted successfully:', result);

        window.alert(`Form submitted successfully: ${JSON.stringify(result)}`);

        // clear only on success
        setEmail('');
        setTouched({ email: false });
      } else {
        console.error('Form submission failed:', result);

        window.alert(`Form submission failed: ${JSON.stringify(result)}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
      <div id='form-input-container' className='flex flex-row w-full'>
        <input
          id='email input'
          className='p-2 border border-black grow rounded-l-md border-r-0 hover:cursor-pointer'
          type='email'
          value={email}
          onChange={handleEmailChange}
          onBlur={() => handleBlur()}
          onFocus={() => setTouched((prev) => ({ ...prev, email: true }))}
          placeholder='Enter your email'
        />
        <button
          id='subscribe button'
          type='submit'
          disabled={!valuesAreValid}
          className='
            p-2
            rounded-r-md
            border-l-0
            text-white
            bg-black
            hover:cursor-pointer
            disabled:bg-gray-400
            disabled:cursor-not-allowed
          '
        >
          Subscribe
        </button>
      </div>
      <div id='email-error-container'>
        {touched.email && emailError && (
          <p className='text-red-800 font-bold text-sm mt-1'>{emailError}</p>
        )}
      </div>
    </form>
  );
};
