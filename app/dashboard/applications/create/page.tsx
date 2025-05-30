import Form from '@/app/ui/applications/create-form';  // updated path to applications create form
import Breadcrumbs from '@/app/ui/applications/breadcrumbs';  // updated breadcrumbs component
import { fetchJobs } from '@/app/lib/data';  // fetch jobs or companies relevant to applications
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Application',
};

export default async function Page() {
  const jobs = await fetchJobs();  // fetch jobs data to select for new application

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Applications', href: '/dashboard/applications' },
          {
            label: 'Create Application',
            href: '/dashboard/applications/create',
            active: true,
          },
        ]}
      />
      <Form jobs={jobs} />
    </main>
  );
}
