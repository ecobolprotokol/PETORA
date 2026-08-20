import { EmployeeTable } from '@/components/domain/employee/employee-table';
import { EmployeeService } from '@/lib/services/employee.service';
import type { Employee } from '@/types/employee';

export default async function EmployeesPage(): Promise<React.ReactElement> {
  let employees: Employee[] = [];
  try {
    const result = await EmployeeService.listEmployees({ limit: 100 });
    employees = result.data as unknown as Employee[];
  } catch {
    employees = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Employees</h1>
        <p className="text-muted-foreground">Kelola data karyawan</p>
      </div>
      <EmployeeTable employees={employees} />
    </div>
  );
}
