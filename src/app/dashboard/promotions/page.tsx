import { Suspense } from 'react';
import { PromotionTable } from '@/components/domain/promotion/promotion-table';
import { MarketingService } from '@/lib/services/marketing.service';

export default async function PromotionsPage() {
  const promotions = await MarketingService.listPromotions();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Promotions</h1>
        <p className="text-muted-foreground">Kelola promosi dan diskon</p>
      </div>
      <Suspense fallback={<div>Loading promotions...</div>}>
        <PromotionTable promotions={promotions} />
      </Suspense>
    </div>
  );
}
