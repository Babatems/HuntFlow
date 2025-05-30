// This component renders the HuntFlow dashboard with suspense fallbacks for loading states

import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {
  ApplicationStatsSkeleton,
  JobsTableSkeleton,
  JobCardsSkeleton,
} from '@/app/ui/skeletons';

import CardWrapper from '@/app/ui/dashboard/cards'; // ✅ Job summary cards
import ApplicationStatChart from '@/app/ui/dashboard/application-stat'; // ✅ Application stats chart
// ⛔️ Replace this with JobsTable once available
// import LatestInvoices from '@/app/ui/dashboard/latest-invoices';

export default async function Page() {
  return (
    <main className="space-y-6">
      <h1 className={`${lusitana.className} text-xl md:text-2xl`}>
        Dashboard
      </h1>

      {/* Job Summary Cards */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<JobCardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </section>

      {/* Application Stats + Table */}
      <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<ApplicationStatsSkeleton />}>
          <ApplicationStatChart />
        </Suspense>

        <Suspense fallback={<JobsTableSkeleton />}>
          {/* TODO: Replace with <JobsTable /> when created */}
          <div className="col-span-4 lg:col-span-4 bg-white p-4 rounded-lg shadow-sm">
            {/* Temporary placeholder */}
            <p className="text-gray-500 text-sm">Jobs table component goes here</p>
          </div>
        </Suspense>
      </section>
    </main>
  );
}
