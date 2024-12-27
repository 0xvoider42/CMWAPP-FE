import Link from 'next/link';
import { Button } from '../ui/button';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Campaign Manager
        </Link>
        <nav className="space-x-4">
          <Button asChild variant="outline">
            <Link href="/campaigns">Campaigns</Link>
          </Button>
          <Button asChild>
            <Link href="/campaigns/create">Create Campaign</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
