import { useState } from 'react';

export const SubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [touched, setTouched] = useState({
    email: false,
  });
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const valuesAreValid = !emailError && email !== '';

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

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateEmail(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validated = validateEmail(email);
    if (validated) {
      // Submit form logic here
      console.log('Form submitted with email:', email);
      setEmail('');
      setTouched({ email: false });
    }
  };

  return (
    <form className='flex flex-col'>
      <div id='form-input-container' className='flex flex-row w-full'>
        <input
          id='email input'
          className='p-2 border border-black grow rounded-l-md border-r-0 hover:cursor-pointer'
          type='email'
          value={email}
          onChange={handleEmailChange}
          onBlur={() => handleBlur('email')}
          onFocus={() => setTouched((prev) => ({ ...prev, email: true }))}
          placeholder='Enter your email'
        />
        <button
          id='subscribe button'
          type='submit'
          disabled={!valuesAreValid}
          onClick={handleSubmit}
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
