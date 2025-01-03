"use client";

import { useState } from "react";
import { debounce } from "lodash";
import Link from "next/link";
import { useCampaigns } from "@/lib/hooks/use-campaigns";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function CampaignList() {
  const [filters, setFilters] = useState({
    title: '',
    landingPageUrl: '',
    isRunning: undefined as boolean | undefined,
  });

  // Debounce the filter updates
  const debouncedSetFilters = debounce((newFilters) => {
    setFilters(newFilters);
  }, 300);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, [field]: e.target.value };
    debouncedSetFilters(newFilters);
  };

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
          defaultValue={filters.title}
          onChange={handleInputChange('title')}
          className="max-w-xs"
        />
        <Input
          placeholder="Search by URL..."
          defaultValue={filters.landingPageUrl}
          onChange={handleInputChange('landingPageUrl')}
          className="max-w-xs"
        />
        <Select
          value={filters.isRunning === undefined ? "all" : filters.isRunning.toString()}
          onValueChange={(value) =>
            setFilters({
              ...filters,
              isRunning: value === "all" ? undefined : value === "true",
            })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Running</SelectItem>
            <SelectItem value="false">Stopped</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Title</TableHead>
            <TableHead className="w-[300px]">Landing Page URL</TableHead>
            <TableHead className="w-[120px] text-center">Status</TableHead>
            <TableHead className="w-[100px] text-center">Payouts</TableHead>
            <TableHead className="w-[180px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns?.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-medium">{campaign.title}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {campaign.landingPageUrl}
              </TableCell>
              <TableCell className="text-center">
                <span
                  className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                    campaign.isRunning
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {campaign.isRunning ? "Running" : "Stopped"}
                </span>
              </TableCell>
              <TableCell className="text-center font-medium">
                {campaign.payouts.length}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/campaigns/${campaign.id}`}>View</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/campaigns/${campaign.id}/edit`}>Edit</Link>
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
