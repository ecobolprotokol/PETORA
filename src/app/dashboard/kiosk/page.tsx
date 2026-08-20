import { KioskTable } from '@/components/domain/kiosk/kiosk-table';
import { KioskService } from '@/lib/services/kiosk.service';
import type { Kiosk } from '@/types/kiosk';

export default async function KioskPage(): Promise<React.ReactElement> {
  let kiosks: Kiosk[] = [];
  try {
    kiosks = await KioskService.listKiosks();
  } catch {
    kiosks = [];
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Kiosk Management</h1>
        <p className="text-muted-foreground">Kelola self-service kiosk</p>
      </div>
      <KioskTable kiosks={kiosks} />
    </div>
  );
}
