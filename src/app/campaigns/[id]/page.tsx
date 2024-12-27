'use client';

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
  const params = useParams();
  const router = useRouter();
  const campaignId = parseInt(params.id as string);
  
  const { data: campaign, isLoading } = useCampaign(campaignId);
  const toggleCampaign = useToggleCampaign();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  const handleToggleStatus = async () => {
    try {
      await toggleCampaign.mutateAsync(campaignId);
      toast.success('Campaign status updated');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to update campaign status');
    }
  };

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
            variant={campaign.isRunning ? "destructive" : "default"}
            onClick={handleToggleStatus}
          >
            {campaign.isRunning ? 'Stop Campaign' : 'Start Campaign'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{campaign.title}</CardTitle>
          <CardDescription>Campaign Information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Landing Page URL</h3>
            <p className="text-sm text-gray-500">
              <a href={campaign.landingPageUrl} target="_blank" rel="noopener noreferrer">
                {campaign.landingPageUrl}
              </a>
            </p>
          </div>
          <div>
            <h3 className="font-medium">Description</h3>
            <p className="text-sm text-gray-500">{campaign.description || 'No description'}</p>
          </div>
          <div>
            <h3 className="font-medium">Status</h3>
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs ${
                campaign.isRunning
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {campaign.isRunning ? 'Running' : 'Stopped'}
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
              {campaign.payouts.map((payout) => (
                <TableRow key={payout.id}>
                  <TableCell>{payout.country}</TableCell>
                  <TableCell>{payout.amount.toFixed(2)}</TableCell>
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