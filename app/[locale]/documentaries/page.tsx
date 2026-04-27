import { DocumentariesPage } from '@/components/pages/Documentaries/DocumentariesPage';
import { setRequestLocale } from 'next-intl/server';

export default async function Documentaries({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DocumentariesPage />;
}
