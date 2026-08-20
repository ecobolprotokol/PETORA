import { ExpenseApprovalTable } from '@/components/domain/expense/expense-approval-table';
import { ExpenseService } from '@/lib/services/expense.service';

export default async function ExpenseApprovalPage(): Promise<React.ReactElement> {
  const result = await ExpenseService.listExpenses({ limit: 100, status: 'PENDING' });
  const expenses = result.data as unknown as import('@/types/expense').Expense[];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Expense Approval</h1>
        <p className="text-muted-foreground">Review and approve expenses</p>
      </div>
      <ExpenseApprovalTable expenses={expenses} />
    </div>
  );
}
