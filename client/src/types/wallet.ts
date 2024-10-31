export interface Wallet {
  id: string;
  name: string;
  parent: string;
  schema: string;
  access: Access[];
}

interface Access {
  action: string;
  signer?: {
    $record: string;
  };
  bearer?: {
    $signer: {
      $record: string;
    };
  };
} 