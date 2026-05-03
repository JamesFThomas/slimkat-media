'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export type PressLinkObject = {
  id: number;
  title: string;
  href: string;
  info: string;
};

const pressLinkObjects: PressLinkObject[] = [
  {
    id: 1,
    title: 'projects.project1.links.NPR.label',
    href: 'https://prod-www.npr.org/network/',
    info: 'projects.project1.links.NPR.info',
  },
  {
    id: 2,
    title: 'projects.project2.links.WashingtonPost.label',
    href: 'https://www.washingtonpost.com/',
    info: 'projects.project2.links.WashingtonPost.info',
  },
  {
    id: 3,
    title: 'projects.project3.links.NewYorkTimes.label',
    href: 'https://www.nytco.com/',
    info: 'projects.project3.links.NewYorkTimes.info',
  },
];

type ProjectLinksProps = {
  links?: PressLinkObject[];
  // handleProjectLinkHover: (id: number) => void;
};

export const ProjectLinks = ({
  links = pressLinkObjects,
  // handleProjectLinkHover,
}: ProjectLinksProps) => {
  const t = useTranslations('LandingPage');

  return (
    <ul
      id='projectLinks-list'
      className='w-full flex flex-col gap-4 mt-8 list-disc'
    >
      {links.map((link) => (
          <li
            id='projectLink-item'
            // onMouseEnter={() => handleProjectLinkHover(link.id)}
            key={link.id}
            className='w-full border-[var(--muted-foreground)]/30 py-4'
          >
            <Link
              href={link.href}
              className='block text-lg font-semibold tracking-wide text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors duration-200'
            >
              {t(link.title)}
            </Link>
          <p className='text-sm leading-6 text-[var(--muted-foreground)] mt-1'>
            {t(link.info)}
          </p>
          </li>
      ))}
    </ul>
  );
};
