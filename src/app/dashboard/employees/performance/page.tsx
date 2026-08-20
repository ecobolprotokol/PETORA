import { PerformanceTable } from '@/components/domain/employee/performance-table';
import { EmployeeService } from '@/lib/services/employee.service';

export default async function PerformancePage(): Promise<React.ReactElement> {
  const metrics = await EmployeeService.listPerformanceMetrics();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Performance</h1>
        <p className="text-muted-foreground">Monitor performa karyawan</p>
      </div>
      <PerformanceTable metrics={metrics} />
    </div>
  );
}
