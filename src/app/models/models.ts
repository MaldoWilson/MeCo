export interface User {
    uid: string;
    username: string;
    email: string;
    password: string;
    perfil: 'client' | 'admin';
}

// income.model.ts
export interface IncomeModel {
  amount: number;
  date: string;
}

// expense-category.model.ts
export interface ExpenseCategoryModel {
  name: string;
}

// expense.model.ts
export interface ExpenseModel {
  category_id: string;
  amount: number;
  date: string;
}

// savings-goal.model.ts
export interface SavingsGoalModel {
  amount: number;
  target_date: string;
}

// expense-alert.model.ts
export interface ExpenseAlertModel {
  category_id: string;
  threshold_amount: number;
}

// expense-tip.model.ts
export interface ExpenseTipModel {
  text: string;
}

// monthly-expense.model.ts
export interface MonthlyExpenseModel {
  [month: string]: number;
}



export interface MainModel {
  users: { [userId: string]: User };
  incomes: { [userId: string]: { [incomeId: string]: IncomeModel } };
  expense_categories: { [categoryId: string]: ExpenseCategoryModel };
  expenses: { [userId: string]: { [expenseId: string]: ExpenseModel } };
  savings_goals: { [userId: string]: { [goalId: string]: SavingsGoalModel } };
  expense_alerts: { [userId: string]: { [alertId: string]: ExpenseAlertModel } };
  expense_tips: { [tipId: string]: ExpenseTipModel };
  monthly_expenses: { [userId: string]: MonthlyExpenseModel };
}
