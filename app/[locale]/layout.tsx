import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NavBar } from '@/components/shared/NavBar/NavBar';
import { Footer } from '@/components/shared/Footer/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SlimKat Media',
  description:
    'SlimKat Media is a creative media platform focused on documentary storytelling, film production, and community-driven initiatives through the James & Kayla Thomas Foundation.',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NavBar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
