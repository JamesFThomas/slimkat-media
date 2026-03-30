import { setRequestLocale } from 'next-intl/server';
import { ProductionsPage } from '@/components/pages/Productions/ProductionsPage';

export default async function Productions({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProductionsPage />;
}
