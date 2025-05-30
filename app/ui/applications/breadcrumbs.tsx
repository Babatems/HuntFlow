import { clsx } from 'clsx';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="flex text-sm md:text-base text-gray-600">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {breadcrumb.active ? (
              <span
                aria-current="page"
                className="font-semibold text-gray-900 cursor-default"
              >
                {breadcrumb.label}
              </span>
            ) : (
              <Link href={breadcrumb.href} className="hover:text-gray-900">
                {breadcrumb.label}
              </Link>
            )}
            {index < breadcrumbs.length - 1 && (
              <span className="mx-2 select-none">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
