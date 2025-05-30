// This file defines the login page for the HuntFlow app, rendering the company logo and login form UI.

import HuntFlowLogo from '@/app/ui/huntflow-logo';
import SignupForm from '@/app/ui/signup-form';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <HuntFlowLogo />
          </div>
        </div>
        <Suspense>
          <SignupForm />
        </Suspense>
      </div>
    </main>
  );
}