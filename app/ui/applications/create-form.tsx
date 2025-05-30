// Client-side form component for creating job applications in HuntFlow

'use client';

import { JobField } from '@/app/lib/definition';  // JobField definition for HuntFlow jobs
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createApplication, State } from '@/app/lib/actions';  // HuntFlow createApplication action
import { useActionState } from 'react';
import type { JSX } from 'react';

export default function Form({ jobs }: { jobs: JobField[] }) {
  // Initial form state with no errors or message
  const initialState: State = { message: '', errors: {} };
  // Hook to handle form submission with action state management
  const [state, formAction] = useActionState(createApplication, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Job Position Selection */}
        <div className="mb-4">
          <label htmlFor="position" className="mb-2 block text-sm font-medium">
            Select job position
          </label>
          <div className="relative">
            <select
              id="position"
              name="position"  // matches backend expected field
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="position-error"
              required
            >
              <option value="" disabled>
                Select a job
              </option>
              {jobs.map((job) => (
                <option key={job.id} value={job.title}>
                  {job.title}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div
            id="position-error"
            aria-live="polite"
            aria-atomic="true"
            className="mt-2 text-sm text-red-500"
          >
            {state.errors?.position &&
              state.errors.position.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
          </div>
        </div>

        {/* Company Name Input */}
        <div className="mb-4">
          <label htmlFor="company" className="mb-2 block text-sm font-medium">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Company Name"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            required
          />
          <div
            id="company-error"
            aria-live="polite"
            aria-atomic="true"
            className="mt-2 text-sm text-red-500"
          >
            {state.errors?.company &&
              state.errors.company.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
          </div>
        </div>

        {/* Application Date */}
        <div className="mb-4">
          <label htmlFor="date_applied" className="mb-2 block text-sm font-medium">
            Application Date
          </label>
          <input
            id="date_applied"
            name="date_applied"  // matches backend expected field
            type="date"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            required
          />
          <div
            id="date_applied-error"
            aria-live="polite"
            aria-atomic="true"
            className="mt-2 text-sm text-red-500"
          >
            {state.errors?.date_applied &&
              state.errors.date_applied.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
          </div>
        </div>

        {/* Application Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set application status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              {['pending', 'interviewing', 'accepted', 'rejected'].map((status) => {
                const statusLabels: Record<string, { label: string; bg: string; icon?: JSX.Element }> = {
                  pending: {
                    label: 'Pending',
                    bg: 'bg-gray-100 text-gray-600',
                    icon: <ClockIcon className="h-4 w-4" />,
                  },
                  interviewing: {
                    label: 'Interviewing',
                    bg: 'bg-yellow-300 text-gray-800',
                  },
                  accepted: {
                    label: 'Accepted',
                    bg: 'bg-green-500 text-white',
                    icon: <CheckIcon className="h-4 w-4" />,
                  },
                  rejected: {
                    label: 'Rejected',
                    bg: 'bg-red-500 text-white',
                  },
                };
                const { label, bg, icon } = statusLabels[status];
                return (
                  <div key={status} className="flex items-center">
                    <input
                      id={status}
                      name="status"
                      type="radio"
                      value={status}
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2"
                      required
                    />
                    <label
                      htmlFor={status}
                      className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${bg}`}
                    >
                      {label} {icon}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            id="status-error"
            aria-live="polite"
            aria-atomic="true"
            className="mt-2 text-sm text-red-500"
          >
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/applications"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Application</Button>
      </div>

      {state.message && (
        <p className="mt-4 text-center text-sm text-red-600">{state.message}</p>
      )}
    </form>
  );
}
