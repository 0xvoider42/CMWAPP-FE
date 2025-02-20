import { CampaignForm } from "@/components/campaigns/campaign-form";
import { ProtectedLayout } from "@/components/layout/protected-layout";

export default function CreateCampaignPage() {
  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Create Campaign</h1>
        <CampaignForm />
      </div>
    </ProtectedLayout>
  );
}
