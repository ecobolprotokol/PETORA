import { ExpenseCategoryTable } from '@/components/domain/expense/expense-category-table';
import { ExpenseService } from '@/lib/services/expense.service';

export default async function ExpenseCategoriesPage(): Promise<React.ReactElement> {
  const categories = await ExpenseService.listCategories();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Expense Categories</h1>
        <p className="text-muted-foreground">Kelola kategori pengeluaran</p>
      </div>
      <ExpenseCategoryTable categories={categories} />
    </div>
  );
}
