import { z } from 'zod';

export const createCampaignSchema = z.object({
  name: z.string().trim().min(1).max(150),
  type: z.enum(['EMAIL', 'SMS', 'WHATSAPP', 'PUSH', 'BROADCAST']),
  subject: z.string().trim().max(200),
  content: z.string().trim().min(1).max(10000),
  scheduled_at: z.string().datetime().nullable().optional(),
});

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;
