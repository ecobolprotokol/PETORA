import { CommissionTable } from '@/components/domain/employee/commission-table';
import { EmployeeService } from '@/lib/services/employee.service';

export default async function CommissionsPage(): Promise<React.ReactElement> {
  const rules = await EmployeeService.listCommissionRules();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Commissions</h1>
        <p className="text-muted-foreground">Kelola komisi karyawan</p>
      </div>
      <CommissionTable rules={rules} />
    </div>
  );
}
