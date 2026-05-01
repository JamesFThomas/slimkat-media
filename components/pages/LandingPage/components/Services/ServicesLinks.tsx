'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export type ServiceLinkObject = {
  id: number;
  nameKey: string;
  href: string;
};

const linkObjects: ServiceLinkObject[] = [
  {
    id: 1,
    nameKey: 'services.links.legacyDocumentaries',
    href: '/documentaries',
  },
  {
    id: 2,
    nameKey: 'services.links.foundation',
    href: '/foundation',
  },
  {
    id: 3,
    nameKey: 'services.links.ourWork',
    href: '/productions',
  },
];

type ServicesLinksProps = {
  links?: ServiceLinkObject[];
  handleServiceLinkHover: (id: number) => void;
};

export const ServicesLinks = ({
  links = linkObjects,
  handleServiceLinkHover,
}: ServicesLinksProps) => {
  const t = useTranslations('LandingPage');

  return (
    <ul id='servicesLinks-list' className='w-full flex flex-col'>
      {links.map((link) => (
        <li
          id='servicesLink-item'
          onMouseEnter={() => handleServiceLinkHover(link.id)}
          key={link.id}
          className='w-full border-b border-[var(--muted-foreground)]/30 py-6'
        >
          <Link
            href={link.href}
            className='block text-4xl md:text-5xl xl:text-7xl font-semibold tracking-wide text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors duration-200'
          >
            {t(link.nameKey)}
          </Link>
        </li>
      ))}
    </ul>
  );
};
