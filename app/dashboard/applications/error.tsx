'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center p-4">
      <h2 className="text-center text-lg font-semibold text-red-600">
        Something went wrong!
      </h2>
      <button
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => reset()}
        aria-label="Try again"
      >
        Try again
      </button>
    </main>
  );
}
