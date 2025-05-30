import Image from 'next/image';
import { UpdateApplication, DeleteApplication } from '@/app/ui/applications/buttons';
import ApplicationStatus from '@/app/ui/applications/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredApplications } from '@/app/lib/data';

export default async function ApplicationsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const applications = await fetchFilteredApplications(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile view */}
          <div className="md:hidden">
            {applications?.map((application) => (
              <div
                key={application.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={application.applicantImageUrl}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${application.applicantName}'s profile picture`}
                      />
                      <p>{application.applicantName}</p>
                    </div>
                    <p className="text-sm text-gray-500">{application.applicantEmail}</p>
                  </div>
                  <ApplicationStatus status={application.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{application.jobTitle}</p>
                    <p>{formatDateToLocal(application.appliedDate)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateApplication id={application.id} />
                    <DeleteApplication id={application.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Applicant
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Job Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Applied Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {applications?.map((application) => (
                <tr
                  key={application.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={application.applicantImageUrl}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${application.applicantName}'s profile picture`}
                      />
                      <p>{application.applicantName}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {application.applicantEmail}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {application.jobTitle}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(application.appliedDate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ApplicationStatus status={application.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateApplication id={application.id} />
                      <DeleteApplication id={application.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
