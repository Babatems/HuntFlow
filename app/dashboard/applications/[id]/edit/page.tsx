import Form from '@/app/ui/applications/edit-form';
import Breadcrumbs from '@/app/ui/applications/breadcrumbs';
import { fetchApplicationById, fetchJobs } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Application',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const [application, jobs] = await Promise.all([
    fetchApplicationById(id),
    fetchJobs(),
  ]);

  if (!application) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Applications', href: '/applications' },
          {
            label: 'Edit Application',
            href: `/applications/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form application={application} jobs={jobs}/>
    </main>
  );
}
