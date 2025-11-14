'use client';
import { Toaster } from 'react-hot-toast';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Toaster />
      {children}
    </main>
  );
}
export default AuthLayout;
