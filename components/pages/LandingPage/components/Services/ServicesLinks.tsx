'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export type ServiceLinkObject = {
  id: number;
  name: string;
  href: string;
};

type ServicesLinksProps = {
  links?: ServiceLinkObject[];
};

const linkObjects: ServiceLinkObject[] = [
  {
    id: 1,
    name: 'Legacy Documentaries',
    href: '/documentaries',
  },
  {
    id: 2,
    name: 'The Foundation',
    href: '/foundation',
  },
  {
    id: 3,
    name: 'Our Work',
    href: '/productions',
  },
];

export const ServicesLinks = ({ links = linkObjects }: ServicesLinksProps) => {
  const t = useTranslations('LandingPage');

  return (
    <ul id='servicesLinks-list' className='w-full flex flex-col'>
      {links.map((link) => (
        <li
          id='servicesLink-item'
          key={link.id}
          className='w-full border-b border-[var(--muted-foreground)]/30 py-6'
        >
          <Link
            href={link.href}
            className='block text-3xl md:text-5xl font-semibold tracking-wide text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors duration-200'
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
