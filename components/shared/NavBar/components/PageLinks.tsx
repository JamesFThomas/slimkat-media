'use client';
import Link from 'next/link';

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
  return (
    <div id='nav-pageLinks' className='flex flex-row gap-4 items-center'>
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
  );
};
