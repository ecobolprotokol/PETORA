import { ReferralTable } from '@/components/domain/marketing/referral-table';
import { MarketingService } from '@/lib/services/marketing.service';

export default async function ReferralsPage(): Promise<React.ReactElement> {
  const referrals = await MarketingService.listReferrals();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Referrals</h1>
        <p className="text-muted-foreground">Kelola program referral</p>
      </div>
      <ReferralTable referrals={referrals} />
    </div>
  );
}
