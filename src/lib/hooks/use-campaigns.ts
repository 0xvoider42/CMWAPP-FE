import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { campaignApi } from "@/lib/api/campaigns";
import { Campaign } from "@/types";

export function useCampaigns(params?: {
  title?: string;
  landingPageUrl?: string;
  isRunning?: boolean;
}) {
  return useQuery({
    queryKey: ["campaigns", params],
    queryFn: () => campaignApi.getAll(params),
  });
}

export function useCampaign(id: number) {
  return useQuery({
    queryKey: ["campaign", id],
    queryFn: () => campaignApi.getById(id),
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: campaignApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
}

export function useUpdateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Campaign> }) =>
      campaignApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
}

export function useToggleCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: campaignApi.toggleStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
}

export function useDeleteCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => campaignApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
}
