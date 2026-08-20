import { LoyaltyMembersTable } from '@/components/domain/loyalty/loyalty-members-table';
import { LoyaltyService } from '@/lib/services/loyalty.service';

export default async function LoyaltyMembersPage(): Promise<React.ReactElement> {
  const result = await LoyaltyService.listMembers();
  const members = result.data;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Loyalty Members</h1>
        <p className="text-muted-foreground">Daftar member loyalitas</p>
      </div>
      <LoyaltyMembersTable members={members} />
    </div>
  );
}
