import { ExpenseTable } from '@/components/domain/expense/expense-table';
import { ExpenseService } from '@/lib/services/expense.service';
import type { Expense } from '@/types/expense';

export default async function ExpensesPage(): Promise<React.ReactElement> {
  let expenses: Expense[] = [];
  try {
    const result = await ExpenseService.listExpenses({ limit: 100 });
    expenses = result.data as unknown as Expense[];
  } catch {
    expenses = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Expenses</h1>
        <p className="text-muted-foreground">Kelola pengeluaran bisnis</p>
      </div>
      <ExpenseTable expenses={expenses} />
    </div>
  );
}
