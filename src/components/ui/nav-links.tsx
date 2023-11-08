'use client';

// import {
//   UserGroupIcon,
//   HomeIcon,
//   DocumentDuplicateIcon,
// } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: 'Home', 
    href: '/dashboard',
    // icon: HomeIcon 
  },
  {
    name: 'Blogs',
    href: '/dashboard/blogs',
    // icon: DocumentDuplicateIcon,
  },
  {
    name: 'Notes', 
    href: '/dashboard/notes',
    // icon: UserGroupIcon 
  },
  {
    name: 'Projects', 
    href: '/dashboard/projects',
    // icon: UserGroupIcon 
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        // const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-baseColor p-3 text-sm text-baseColor font-medium hover:bg-slate-500 hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-slate-500 text-primary': pathname === link.href,
              },
            )}
          >
            {/* <LinkIcon className="w-6" /> */}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
