export interface Account {
  id: string;
  phone: string;
  name: string;
}

export interface Prize {
  date: string;
  prize: string;
  status: string;
}

export interface Invoice {
  date: string;
  amount: string;
  status: string;
}

export interface PlayHistory {
  date: string;
  invoiceId: string;
  result: string;
}
