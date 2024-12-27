'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCampaigns } from '@/lib/hooks/use-campaigns';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function CampaignList() {
  const [filters, setFilters] = useState({
    title: '',
    landingPageUrl: '',
    isRunning: undefined as boolean | undefined,
  });

  const { data: campaigns, isLoading, error } = useCampaigns(filters);

  if (isLoading) {
    return <div>Loading campaigns...</div>;
  }

  if (error) {
    return <div>Error loading campaigns</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search by title..."
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          className="max-w-xs"
        />
        <Input
          placeholder="Search by URL..."
          value={filters.landingPageUrl}
          onChange={(e) =>
            setFilters({ ...filters, landingPageUrl: e.target.value })
          }
          className="max-w-xs"
        />
        <Select
          onValueChange={(value) =>
            setFilters({
              ...filters,
              isRunning: value === '' ? undefined : value === 'true',
            })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="true">Running</SelectItem>
            <SelectItem value="false">Stopped</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Landing Page URL</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payouts</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns?.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>{campaign.title}</TableCell>
              <TableCell>{campaign.landingPageUrl}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    campaign.isRunning
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {campaign.isRunning ? 'Running' : 'Stopped'}
                </span>
              </TableCell>
              <TableCell>{campaign.payouts.length}</TableCell>
              <TableCell>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <Link href={`/campaigns/${campaign.id}`}>
                      View
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <Link href={`/campaigns/${campaign.id}/edit`}>
                      Edit
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}