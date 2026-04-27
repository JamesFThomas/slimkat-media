import { setRequestLocale } from 'next-intl/server';
import { ContactPage } from '@/components/pages/Contact/ContactPage';

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactPage />;
}
