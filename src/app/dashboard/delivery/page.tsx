import { DeliveryTable } from '@/components/domain/delivery/delivery-table';
import { DeliveryService } from '@/lib/services/delivery.service';
import type { Delivery } from '@/types/delivery';

export default async function DeliveriesPage(): Promise<React.ReactElement> {
  let deliveries: Delivery[] = [];
  try {
    const result = await DeliveryService.listDeliveries({ limit: 100 });
    deliveries = result.data as unknown as Delivery[];
  } catch {
    deliveries = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Deliveries</h1>
        <p className="text-muted-foreground">Kelola pengiriman</p>
      </div>
      <DeliveryTable deliveries={deliveries} />
    </div>
  );
}
