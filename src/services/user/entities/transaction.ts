export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  date: string;
  value: string;
  balance: string;
}
