// This component renders the HuntFlow logo with a styled briefcase icon and the app name using Lusitana font.

import { BriefcaseIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function HuntFlowLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <BriefcaseIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[36px] md:text-[44px]">HuntFlow</p>
    </div>
  );
}