
import { CampaignForm } from '@/components/campaigns/campaign-form';

export default function CreateCampaignPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create Campaign</h1>
      <CampaignForm />
    </div>
  );
}