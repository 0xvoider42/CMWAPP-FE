'use client'

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCampaign, useToggleCampaign } from '@/lib/hooks/use-campaigns';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const campaignId = parseInt(id as string);
  const { data: campaign, isLoading } = useCampaign(campaignId);
  const toggleCampaign = useToggleCampaign();
  const [isRunning, setIsRunning] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (campaign) {
      setIsRunning(campaign.isRunning);
    }
  }, [campaign]);

  const handleToggleStatus = async () => {
    if (!campaignId) return; // Early return if campaignId is invalid
    try {
      await toggleCampaign.mutateAsync(campaignId);
      setIsRunning((prev) => !prev);
      toast.success('Campaign status updated');
    } catch (error) {
      // @ts-expect-error error is of unknown type
      toast.error(`Failed to update campaign status: ${error.message}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!campaign) return <div>Campaign not found</div>;

  const { title, landingPageUrl, description, payouts } = campaign;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Campaign Details</h1>
        <div className="space-x-4">
          <Button
            variant="outline"
            onClick={() => router.push(`/campaigns/${campaignId}/edit`)}
          >
            Edit Campaign
          </Button>
          <Button
            variant={isRunning ? "destructive" : "default"}
            onClick={handleToggleStatus}
            className={isRunning ? "hover:bg-red-600" : "hover:bg-green-600"}
          >
            {isRunning ? 'Stop Campaign' : 'Start Campaign'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Campaign Information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Landing Page URL</h3>
            <p className="text-sm text-gray-500">
              <a href={landingPageUrl} target="_blank" rel="noopener noreferrer">
                {landingPageUrl}
              </a>
            </p>
          </div>
          <div>
            <h3 className="font-medium">Description</h3>
            <p className="text-sm text-gray-500">{description || 'No description'}</p>
          </div>
          <div>
            <h3 className="font-medium">Status</h3>
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                isRunning ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              <span className={`relative flex h-2 w-2`}>
                {isRunning && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isRunning ? 'bg-green-500' : 'bg-gray-500'}`}></span>
              </span>
              {isRunning ? 'Running' : 'Stopped'}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payouts</CardTitle>
          <CardDescription>Country-specific payout information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Country</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Currency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payouts.map((payout) => (
                <TableRow key={payout.id}>
                  <TableCell>{payout.country}</TableCell>
                  <TableCell>{payout.amount}</TableCell>
                  <TableCell>{payout.currency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}