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

export interface Intent {
    handle: string;
    schema: string;
    claims: {
        action: string;
        amount: number;
        source: {
            handle: string;
        };
        symbol: {
            handle: string;
        };
        target: {
            handle: string;
        };
    }[];
    access: any[];
    config: {
        commit: string;
    };
    
}

