import { setRequestLocale } from 'next-intl/server';
import { FoundationPage } from '@/components/pages/Foundation/FoundationPage';

export default async function Foundation({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FoundationPage />;
}
