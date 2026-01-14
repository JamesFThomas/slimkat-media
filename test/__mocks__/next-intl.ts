export const useLocale = () => 'en';

export const useTranslations = () => (key: string) => {
  const translations: Record<string, string> = {
    'greeting.title': 'Welcome to SlimKat Media',
    'greeting.subtitle': 'Your podcasting partner',
    'greeting.studioImage1Alt': 'Podcast Studio Image 1',
    'greeting.studioImage2Alt': 'Podcast Studio Image 2',
  };

  return translations[key] ?? key;
};
