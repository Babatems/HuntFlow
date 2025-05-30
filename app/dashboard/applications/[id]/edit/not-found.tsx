import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
      <FaceFrownIcon className="w-12 h-12 text-gray-400" />
      <h2 className="text-2xl font-semibold">404 - Application Not Found</h2>
      <p className="text-gray-600 max-w-sm">
        Sorry, we couldn’t find the application you’re looking for.
      </p>
      <Link
        href="/applications"
        className="mt-6 inline-block rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
      >
        Back to Applications
      </Link>
    </main>
  );
}
