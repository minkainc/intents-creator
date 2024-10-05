export interface IntentData {
  sourceType: string;
  source: string;
  customDataSource: string;
  targetType: string;
  target: string;
  customDataTarget: string;
  currency: string;
  amount: string;
  useSDK: boolean;
}

export const accountTypes = [
  { label: 'Savings', value: 'svgs' },
  { label: 'TransactingAccount', value: 'tran' },
  { label: 'Loan', value: 'loan' },
  { label: 'CardAccount', value: 'card' },
];

