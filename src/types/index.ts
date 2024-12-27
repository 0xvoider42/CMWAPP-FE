export interface Campaign {
  id: number;
  title: string;
  landingPageUrl: string;
  isRunning: boolean;
  description?: string;
  budget?: number;
  dailyBudget?: number;
  createdAt: string;
  updatedAt: string;
  payouts: Payout[];
}

export interface Payout {
  id: number;
  campaignId: number;
  country: string;
  amount: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
