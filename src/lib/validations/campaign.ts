import * as z from "zod";

export const payoutSchema = z.object({
  country: z.string().length(2, "Country code must be 2 characters"),
  amount: z.number().min(0, "Amount must be positive"),
  currency: z
    .string()
    .length(3, "Currency code must be 3 characters")
    .default("USD"),
});

export const campaignSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  landingPageUrl: z.string().url("Must be a valid URL"),
  description: z.string().optional(),
  budget: z.number().optional(),
  dailyBudget: z.number().optional(),
  payouts: z.array(payoutSchema).min(1, "At least one payout must be added"),
});
