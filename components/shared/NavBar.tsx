'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export const NavBar = () => {
  const locale = useLocale();

  const shouldUnderlineEnglish = locale === 'en' ? true : false;

  const nextLocalePath = locale === 'en' ? '/fr' : '/';

  return (
    <nav className='bg-gray-200 p-4 border-b border-black'>
      <div className='container mx-auto w-full flex flex-row justify-between'>
        <Image
          src='/logo/SlimKat_Logo.png'
          alt='SlimKat Media Logo'
          width={200}
          height={100}
        />
        <Link
          aria-label='Toggle language'
          className='flex-col justify-center items-center border-2 border-b-black p-2 rounded-md hover:bg-gray-300'
          href={`${nextLocalePath}`}
        >
          <span
            className={`text-lg ${
              shouldUnderlineEnglish ? 'underline' : 'no-underline'
            }`}
          >
            EN
          </span>{' '}
          |{' '}
          <span
            className={`text-lg ${
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
