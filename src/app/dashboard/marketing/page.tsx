import { CampaignTable } from '@/components/domain/marketing/campaign-table';
import { MarketingService } from '@/lib/services/marketing.service';
import type { Campaign } from '@/types/marketing';

export default async function MarketingPage(): Promise<React.ReactElement> {
  let campaigns: Campaign[] = [];
  try {
    const result = await MarketingService.listCampaigns({ limit: 100 });
    campaigns = result.data as unknown as Campaign[];
  } catch {
    campaigns = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Marketing</h1>
        <p className="text-muted-foreground">Kelola kampanye pemasaran</p>
      </div>
      <CampaignTable campaigns={campaigns} />
    </div>
  );
}
