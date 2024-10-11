export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  date: string;
  amount: string;
}
