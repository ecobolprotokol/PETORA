import { DeliveryZoneTable } from '@/components/domain/delivery/delivery-zone-table';
import { DeliveryService } from '@/lib/services/delivery.service';
import type { DeliveryZone } from '@/types/delivery';

export default async function DeliveryZonesPage(): Promise<React.ReactElement> {
  let zones: DeliveryZone[] = [];
  try {
    zones = (await DeliveryService.listZones()) as unknown as DeliveryZone[];
  } catch {
    zones = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Delivery Zones</h1>
        <p className="text-muted-foreground">Kelola zona pengiriman</p>
      </div>
      <DeliveryZoneTable zones={zones} />
    </div>
  );
}
