'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { useAuth } from '../auth/auth-provider';
import { removeAuthToken } from '@/lib/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    removeAuthToken();
    setUser(null);
    router.push('/login');
  };

  if (pathname === '/login') {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Campaign Manager
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <nav className="hidden md:flex items-center space-x-4">
                <Button asChild variant="ghost">
                  <Link 
                    href="/campaigns" 
                    className={pathname.includes('/campaigns') && !pathname.includes('/create') ? 'text-primary' : ''}
                  >
                    Campaigns
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link 
                    href="/campaigns/create"
                    className={pathname.includes('/create') ? 'text-primary' : ''}
                  >
                    Create Campaign
                  </Link>
                </Button>
              </nav>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-4">
                    {user.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}