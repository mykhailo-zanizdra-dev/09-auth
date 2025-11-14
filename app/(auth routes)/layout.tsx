'use client';
import Loader from '@/components/Loader/Loader';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    router.refresh();
    setIsLoading(false);
  }, [router]);

  return (
    <main>
      <Toaster />
      {isLoading ? <Loader /> : children}
    </main>
  );
}
export default AuthLayout;
