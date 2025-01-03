'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../auth/auth-provider';

const publicPaths = ['/login'];

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!user && !publicPaths.includes(pathname)) {
      router.push('/login');
    } else if (user && pathname === '/login') {
      router.push('/campaigns');
    }
  }, [user, pathname, router]);

  if (!user && !publicPaths.includes(pathname)) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {children}
    </div>
  );
}