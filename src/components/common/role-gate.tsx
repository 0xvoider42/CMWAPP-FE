'use client';

import { useAuth } from '../auth/auth-provider';
import { UserRole } from '@/lib/auth';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export function RoleGate({ children, allowedRoles }: RoleGateProps) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}