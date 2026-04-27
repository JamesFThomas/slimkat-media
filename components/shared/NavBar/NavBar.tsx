'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { links, PageLinks } from './components/PageLinks';

export const NavBar = () => {
  const locale = useLocale();
  const pathname = usePathname();

  const shouldUnderlineEnglish = locale === 'en' ? true : false;

  const nextLocalePath =
    locale === 'en' ? `/fr${pathname}` : pathname.replace(/^\/fr/, '') || '/';

  return (
    <nav
      id='navbar-container'
      className='bg-[var(--chrome)] text-[var(--foreground)] p-4 border-b border-[var(--border)]'
    >
      <div
        id='navbar-content'
        className='mx-auto w-full flex flex-row justify-between'
      >
        {/* Slim Kat logo
        <Link href={`/${locale}`} aria-label='Go to landing page'>
          <Image
            src='/logo/SlimKat_Logo.png'
            alt='SlimKat Media Logo'
            width={200}
            height={100}
          />
        </Link> */}

        {/* Page links & Button */}
        <PageLinks links={links} />

        {/* Language toggle */}
        <Link
          aria-label='Toggle language'
          className='flex items-center justify-center h-10 px-3 rounded-md border border-[var(--border)] hover:bg-[var(--surface)] text-lg leading-none'
          href={`${nextLocalePath}`}
        >
          <span
            className={`${
              shouldUnderlineEnglish ? 'underline' : 'no-underline'
            }`}
          >
            EN
          </span>{' '}
          |{' '}
          <span
            className={`${
              !shouldUnderlineEnglish ? 'underline' : 'no-underline'
            }`}
          >
            FR
          </span>
        </Link>
      </div>
    </nav>
  );
};
