import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function ApplicationStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
        {
          'bg-yellow-100 text-yellow-800': status === 'pending',
          'bg-green-500 text-white': status === 'accepted',
          'bg-red-100 text-red-800': status === 'rejected',
          'bg-gray-100 text-gray-500': status === 'in_review',
        },
      )}
    >
      {status === 'pending' && (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-yellow-800" />
        </>
      )}
      {status === 'accepted' && (
        <>
          Accepted
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      )}
      {status === 'rejected' && (
        <>
          Rejected
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 h-4 w-4 text-red-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </>
      )}
      {status === 'in_review' && (
        <>
          In Review
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      )}
    </span>
  );
}
