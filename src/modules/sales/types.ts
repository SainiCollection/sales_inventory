export interface SaleRecord {
  id: number | string;
  productId?: number | string;
  quantity: number;
  total?: number;
  date?: string;
}

export interface SalesState {
  records: SaleRecord[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
}
