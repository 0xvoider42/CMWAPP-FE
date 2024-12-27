'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { campaignSchema } from '@/lib/validations/campaign';
import { useCreateCampaign, useUpdateCampaign } from '@/lib/hooks/use-campaigns';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { z } from 'zod';
import { Campaign } from '@/types';
import { PayoutFormList } from './payout-form-list';

type FormData = z.infer<typeof campaignSchema>;

interface CampaignFormProps {
  initialData?: Campaign;
  isEditing?: boolean;
}

export function CampaignForm({ initialData, isEditing }: CampaignFormProps) {
  const router = useRouter();
  const createCampaign = useCreateCampaign();
  const updateCampaign = useUpdateCampaign();
  const [step, setStep] = useState(1);

  const form = useForm<FormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: initialData || {
      title: '',
      landingPageUrl: '',
      description: '',
      payouts: [],
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (isEditing && initialData) {
        await updateCampaign.mutateAsync({ id: initialData.id, data });
        toast.success('Campaign updated successfully');
      } else {
        await createCampaign.mutateAsync(data);
        toast.success('Campaign created successfully');
      }
      router.push('/campaigns');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {step === 1 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="landingPageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Landing Page URL</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="button" onClick={() => setStep(2)}>
              Next: Configure Payouts
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <PayoutFormList
              control={form.control}
              name="payouts"
            />

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="submit">
                {isEditing ? 'Update Campaign' : 'Create Campaign'}
              </Button>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}