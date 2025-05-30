import {
  ClipboardDocumentListIcon,
  ClockIcon,
  BriefcaseIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchJobCardData } from '@/app/lib/data'; // 🔄 Make sure this API exists or adapt to yours

const iconMap = {
  total: ClipboardDocumentListIcon,
  pending: ClockIcon,
  interviewing: BriefcaseIcon,
  rejected: XCircleIcon,
};

export default async function CardWrapper() {
  const {
    totalApplications,
    pendingApplications,
    interviewingApplications,
    rejectedApplications,
  } = await fetchJobCardData();

  return (
    <>
      <Card title="Total Applications" value={totalApplications} type="total" />
      <Card title="Pending" value={pendingApplications} type="pending" />
      <Card title="Interviewing" value={interviewingApplications} type="interviewing" />
      <Card title="Rejected" value={rejectedApplications} type="rejected" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'total' | 'pending' | 'interviewing' | 'rejected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
