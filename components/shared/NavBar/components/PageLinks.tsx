'use client';
import Link from 'next/link';
import { useState } from 'react';

export const links = [
  {
    id: 1,
    name: 'Home',
    href: '/',
  },
  {
    id: 2,
    name: 'Documentaries',
    href: '/documentaries',
  },
  {
    id: 3,
    name: 'Productions',
    href: '/productions',
  },
  {
    id: 4,
    name: 'Foundation',
    href: '/foundation',
  },
  {
    id: 5,
    name: 'Contact',
    href: '/contact',
  },
];

type PageLinkObject = {
  id: number;
  name: string;
  href: string;
};

type PageLinkProps = {
  links: PageLinkObject[];
  pathname: string;
};

export const PageLinks = ({ links, pathname }: PageLinkProps) => {
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
              className='text-lg hover:underline'
              href={link.href}
              style={{
                textDecoration: pathname === link.href ? 'underline' : 'none',
              }}
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
                  style={{
                    textDecoration:
                      pathname === link.href ? 'underline' : 'none',
                  }}
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
