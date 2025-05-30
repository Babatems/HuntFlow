'use client';

import {
  CheckIcon,
  ClockIcon,
  ClipboardDocumentCheckIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateApplication, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function EditApplicationForm({
  application,
  jobs,
}: {
  application: {
    id: string;
    job_id: string; // added job_id for selected job reference
    company_name: string;
    job_title: string;
    status: 'applied' | 'interviewing' | 'offered' | 'rejected' | 'ghosted';
    application_date: string; // ISO string
  };
  jobs: {
    id: string;
    company: string;
    role: string;
  }[];
}) {
  const initialState: State = { message: '', errors: {} };
  const updateAppWithId = updateApplication.bind(null, application.id);
  const [state, formAction] = useActionState(updateAppWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Company Name */}
        <div className="mb-4">
          <label htmlFor="company" className="mb-2 block text-sm font-medium">
            Company Name
          </label>
          <input
            id="company"
            name="company"
            type="text"
            defaultValue={application.company_name}
            placeholder="Enter company name"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          />
          {state.errors?.company && (
            <p className="mt-1 text-xs text-red-600">{state.errors.company[0]}</p>
          )}
        </div>

        {/* Job Title / Position */}
        <div className="mb-4">
          <label htmlFor="position" className="mb-2 block text-sm font-medium">
            Job Title / Position
          </label>
          <input
            id="position"
            name="position"
            type="text"
            defaultValue={application.job_title}
            placeholder="Enter job title or position"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          />
          {state.errors?.position && (
            <p className="mt-1 text-xs text-red-600">{state.errors.position[0]}</p>
          )}
        </div>

        {/* Job Selector Dropdown */}
        <div className="mb-4">
          <label htmlFor="job_id" className="mb-2 block text-sm font-medium">
            Select Job
          </label>
          <select
            id="job_id"
            name="job_id"
            defaultValue={application.job_id}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          >
            <option value="">-- Select a job --</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.company} - {job.role}
              </option>
            ))}
          </select>
          {state.errors?.job_id && (
            <p className="mt-1 text-xs text-red-600">{state.errors.job_id[0]}</p>
          )}
        </div>

        {/* Application Date */}
        <div className="mb-4">
          <label htmlFor="date_applied" className="mb-2 block text-sm font-medium">
            Application Date
          </label>
          <input
            id="date_applied"
            name="date_applied"
            type="date"
            defaultValue={application.application_date.slice(0, 10)} // ISO date YYYY-MM-DD
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          />
          {state.errors?.date_applied && (
            <p className="mt-1 text-xs text-red-600">{state.errors.date_applied[0]}</p>
          )}
        </div>

        {/* Application Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">Application Status</legend>
          <div className="rounded-md border border-gray-200 bg-white px-4 py-3">
            <div className="flex flex-wrap gap-4">
              {[
                { value: 'applied', label: 'Applied', icon: ClipboardDocumentCheckIcon, color: 'bg-blue-100 text-blue-600' },
                { value: 'interviewing', label: 'Interviewing', icon: ClockIcon, color: 'bg-yellow-100 text-yellow-600' },
                { value: 'offered', label: 'Offered', icon: CheckIcon, color: 'bg-green-100 text-green-600' },
                { value: 'rejected', label: 'Rejected', icon: XCircleIcon, color: 'bg-red-100 text-red-600' },
                { value: 'ghosted', label: 'Ghosted', icon: XCircleIcon, color: 'bg-gray-200 text-gray-600' },
              ].map(({ value, label, icon: Icon, color }) => (
                <label
                  key={value}
                  htmlFor={value}
                  className={`flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${application.status === value ? color : 'bg-gray-100 text-gray-600'}`}
                >
                  <input
                    id={value}
                    name="status"
                    type="radio"
                    value={value}
                    defaultChecked={application.status === value}
                    className="hidden"
                  />
                  <Icon className="h-4 w-4" />
                  {label}
                </label>
              ))}
            </div>
          </div>
          {state.errors?.status && (
            <p className="mt-1 text-xs text-red-600">{state.errors.status[0]}</p>
          )}
        </fieldset>

        {state.message && (
          <p className="mt-4 text-sm font-medium text-red-600">{state.message}</p>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/applications"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Application</Button>
      </div>
    </form>
  );
}
