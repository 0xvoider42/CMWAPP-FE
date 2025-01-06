'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { useAuth } from '../auth/auth-provider';
import { removeAuthToken, UserRole } from '@/lib/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { RoleGate } from '../common/role-gate';

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
      <div className="container mx-auto h-14 flex items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-xl font-bold">
          Campaign Manager
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <nav className="hidden md:flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/campaigns">Campaigns</Link>
                </Button>
                <RoleGate allowedRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/campaigns/create">Create Campaign</Link>
                  </Button>
                </RoleGate>
              </nav>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
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
            <Button asChild variant="outline" size="sm">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}