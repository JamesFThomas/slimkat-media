export const useLocale = () => 'en';

export const useTranslations = () => (key: string) => {
  const translations: Record<string, string> = {
    'greeting.title': 'Welcome to SlimKat Media',
    'greeting.subtitle': 'Your podcasting partner',
    'greeting.studioImage1Alt': 'Podcast Studio Image 1',
    'greeting.studioImage2Alt': 'Podcast Studio Image 2',
    'labels.fullName': 'Full Name',
    'labels.firstName': 'First Name',
    'labels.lastName': 'Last Name',
    'labels.email': 'Email',
    'labels.phone': 'Phone',
    'labels.optional': 'Optional',
    'labels.service': 'Service',
    'labels.message': 'Message',
    'labels.submit': 'Send Message',
    'placeholders.firstName': 'First name',
    'placeholders.lastName': 'Last name',
    'placeholders.email': 'your@email.com',
    'placeholders.phone': '(555) 000-0000',
    'placeholders.service': 'Select a service',
    'placeholders.message': 'Tell us about your project...',
    'serviceOptions.documentary': 'Documentary Services',
    'serviceOptions.speaking': 'Speaking Engagements',
    'errors.firstNameRequired': 'First name is required.',
    'errors.lastNameRequired': 'Last name is required.',
    'errors.emailRequired': 'Email is required.',
    'errors.emailInvalid': 'Please enter a valid email.',
    'errors.phoneInvalid': 'Please enter a valid phone number.',
    'errors.serviceRequired': 'Please select a service.',
    'errors.messageRequired': 'Message is required.',
    'status.loading': 'Sending...',
    'status.success': 'Your message has been sent!',
    'status.error': 'Something went wrong. Please try again.',
  };

  return translations[key] ?? key;
};
