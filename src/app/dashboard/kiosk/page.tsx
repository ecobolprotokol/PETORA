import { KioskTable } from '@/components/domain/kiosk/kiosk-table';
import { KioskService } from '@/lib/services/kiosk.service';

export default async function KioskPage(): Promise<React.ReactElement> {
  const kiosks = await KioskService.listKiosks();
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
