import { SegmentTable } from '@/components/domain/marketing/segment-table';
import { MarketingService } from '@/lib/services/marketing.service';

export default async function SegmentsPage(): Promise<React.ReactElement> {
  const segments = await MarketingService.listSegments();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Segments</h1>
        <p className="text-muted-foreground">Kelola segmen pelanggan</p>
      </div>
      <SegmentTable segments={segments} />
    </div>
  );
}
