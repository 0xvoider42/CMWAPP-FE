"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Search,
  Plus,
  ArrowUpDown,
  MoreHorizontal,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useCampaigns, useToggleCampaign } from "@/lib/hooks/use-campaigns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CampaignsPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    title: "",
    landingPageUrl: "",
    isRunning: undefined as boolean | undefined,
  });

  const { data: campaigns, isLoading, error } = useCampaigns(filters);
  const toggleCampaign = useToggleCampaign();

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      await toggleCampaign.mutateAsync(id);
      toast.success(
        `Campaign ${currentStatus ? "stopped" : "started"} successfully`
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update campaign status");
    }
  };

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
          <CardDescription>Failed to load campaigns</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage and monitor your advertising campaigns
          </p>
        </div>
        <Button asChild>
          <Link href="/campaigns/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>
            Narrow down campaigns by specific criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title..."
                value={filters.title}
                onChange={(e) =>
                  setFilters({ ...filters, title: e.target.value })
                }
                className="max-w-xs"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by URL..."
                value={filters.landingPageUrl}
                onChange={(e) =>
                  setFilters({ ...filters, landingPageUrl: e.target.value })
                }
                className="max-w-xs"
              />
            </div>
            <Select
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  isRunning: value === "all" ? undefined : value === "true",
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="true">Running</SelectItem>
                <SelectItem value="false">Stopped</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Campaigns Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">
                  <div className="flex items-center space-x-2">
                    <span>Title</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="min-w-[200px]">
                  Landing Page URL
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Payouts</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex items-center justify-center text-muted-foreground">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      Loading campaigns...
                    </div>
                  </TableCell>
                </TableRow>
              ) : campaigns?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center text-muted-foreground space-y-2">
                      <p>No campaigns found</p>
                      <Button asChild variant="outline" size="sm">
                        <Link href="/campaigns/create">
                          Create your first campaign
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                campaigns?.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">
                      {campaign.title}
                      {console.log(campaign)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <a
                        href={campaign.landingPageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {campaign.landingPageUrl}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={campaign.isRunning ? "default" : "secondary"}
                        className="flex items-center w-fit gap-1"
                      >
                        {campaign.isRunning ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <XCircle className="h-3 w-3" />
                        )}
                        {campaign.isRunning ? "Running" : "Stopped"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{campaign.payouts.length}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(`/campaigns/${campaign.id}`)
                            }
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(`/campaigns/${campaign.id}/edit`)
                            }
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleToggleStatus(
                                campaign.id,
                                campaign.isRunning
                              )
                            }
                          >
                            {campaign.isRunning
                              ? "Stop Campaign"
                              : "Start Campaign"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
