'use client';
import Link from 'next/link';
import { useState } from 'react';

export const links = [
  {
    id: 1,
    name: 'Documentaries',
    href: '/',
  },
  {
    id: 2,
    name: 'Productions',
    href: '/',
  },
  {
    id: 3,
    name: 'Foundation',
    href: '/',
  },
  {
    id: 4,
    name: 'Contact',
    href: '/',
  },
];

type PageLinkProps = {
  id: number;
  name: string;
  href: string;
};

export const PageLinks = ({ links }: { links: PageLinkProps[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div id='nav-pageLinks-container' className='flex flex-row '>
      {/* Desktop Links */}
      <div id='desktop-links' className='hidden md:flex gap-2 items-center'>
        {links.map((link) => (
          <Link
            key={link.id}
            className='text-lg hover:underline'
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Links */}
      <div id='mobile-links' className='relative flex items-center md:hidden'>
        {/* Trigger */}
        <button
          onClick={() => setOpen(!open)}
          className='flex items-center justify-center h-10 px-3 rounded-md border border-[var(--border)] hover:bg-[var(--surface)] text-lg leading-none'
        >
          Pages
        </button>

        {/* Dropdown */}
        {open && (
          <div className='absolute top-full mt-2 flex flex-col gap-2 border border-[var(--border)] bg-[var(--chrome)] p-3 rounded-md'>
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className='text-lg hover:underline'
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
