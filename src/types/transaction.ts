export type RespTransactions = {
  status: boolean;
  message: string;
  data: Transaction[];
  current_page: number;
  last_page: number;
};

export type Transaction = {
  id: number;
  name: string;
  phone_number: string;
  status: string;
  package_id: number;
  package_name: string;
};
