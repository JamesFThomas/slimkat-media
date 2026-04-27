'use client';
import Link from 'next/link';
import { useState } from 'react';

export const links = [
  {
    id: 1,
    name: 'Documentaries',
    href: '/documentaries',
  },
  {
    id: 2,
    name: 'Productions',
    href: '/productions',
  },
  {
    id: 3,
    name: 'Foundation',
    href: '/foundation',
  },
  {
    id: 4,
    name: 'Contact',
    href: '/contact',
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
    <section
      id='pageLinks-container'
      aria-label='Page links'
      className='flex flex-row '
    >
      {/* Desktop Links */}
      <ul id='desktop-links' className='hidden md:flex gap-2 items-center'>
        {links.map((link) => (
          <li key={link.id}>
            <Link
              // key={link.id}
              className='text-lg hover:underline'
              href={link.href}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

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
          <ul className='absolute top-full mt-2 flex flex-col gap-2 border border-[var(--border)] bg-[var(--chrome)] p-3 rounded-md'>
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className='text-lg hover:underline'
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
