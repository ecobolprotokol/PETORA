import { LoyaltyTransactionsTable } from '@/components/domain/loyalty/loyalty-transactions-table';
import { LoyaltyService } from '@/lib/services/loyalty.service';

export default async function LoyaltyTransactionsPage(): Promise<React.ReactElement> {
  const result = await LoyaltyService.listTransactions();
  const transactions = result.data;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Loyalty Transactions</h1>
        <p className="text-muted-foreground">Riwayat transaksi poin loyalitas</p>
      </div>
      <LoyaltyTransactionsTable transactions={transactions} />
    </div>
  );
}
