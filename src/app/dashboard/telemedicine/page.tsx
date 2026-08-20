import { TelemedicineSessionTable } from '@/components/domain/telemedicine/telemedicine-session-table';
import { TelemedicineService } from '@/lib/services/telemedicine.service';
import type { TelemedicineSession } from '@/types/telemedicine';

export default async function TelemedicinePage(): Promise<React.ReactElement> {
  let sessions: TelemedicineSession[] = [];
  try {
    const result = await TelemedicineService.listSessions({ limit: 100 });
    sessions = result.data as unknown as TelemedicineSession[];
  } catch {
    sessions = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Telemedicine</h1>
        <p className="text-muted-foreground">Kelola sesi telemedicine</p>
      </div>
      <TelemedicineSessionTable sessions={sessions} />
    </div>
  );
}
