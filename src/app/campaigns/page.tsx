import { ProtectedLayout } from "@/components/layout/protected-layout";
import { CampaignList } from "@/components/campaigns/campaign-list";

export default function CampaignsPage() {
  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Campaigns</h1>
        </div>
        <CampaignList />
      </div>
    </ProtectedLayout>
  );
}
