// Layout for the HuntFlow dashboard pages with side navigation and main content area.

import SideNav from '@/app/ui/dashboard/sidenav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HuntFlow Dashboard',
};

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gray-50">
      {/* Sidebar navigation */}
      <aside className="w-full flex-none md:w-64 border-r border-gray-200 bg-white">
        <SideNav />
      </aside>

      {/* Main content area */}
      <main className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}
      </main>
    </div>
  );
}