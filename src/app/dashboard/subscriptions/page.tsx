import { SubscriptionTable } from '@/components/domain/subscription/subscription-table';
import { SubscriptionService } from '@/lib/services/subscription.service';
import type { Subscription } from '@/types';

export default async function SubscriptionsPage(): Promise<React.ReactElement> {
  let subscriptions: Subscription[] = [];
  try {
    const result = await SubscriptionService.listSubscriptions({ limit: 100 });
    subscriptions = result.data as unknown as Subscription[];
  } catch {
    subscriptions = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Subscriptions</h1>
        <p className="text-muted-foreground">Kelola langganan pelanggan</p>
      </div>
      <SubscriptionTable subscriptions={subscriptions} />
    </div>
  );
}
