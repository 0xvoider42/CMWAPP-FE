"use client";

import { useParams } from "next/navigation";
import { useCampaign } from "@/lib/hooks/use-campaigns";
import { CampaignForm } from "@/components/campaigns/campaign-form";
import { ProtectedLayout } from "@/components/layout/protected-layout";

export default function EditCampaignPage() {
  const params = useParams();
  const campaignId = parseInt(params.id as string);
  const { data: campaign, isLoading } = useCampaign(campaignId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Edit Campaign</h1>
        <CampaignForm initialData={campaign} isEditing />
      </div>
    </ProtectedLayout>
  );
}
