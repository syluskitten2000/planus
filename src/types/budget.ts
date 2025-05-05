export interface Budget {
  id: string;
  name: string;
  min: number;
  max: number;
  activities: string[];
  locations: string[];
  moodTypes: string[];
}

export interface BudgetType {
  id: string;
  name: string;
  budgets: Budget[];
} 