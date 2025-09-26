export interface SaleItem {
  id: number | string;
  sku?: string;                      // image URL
  name: string;
  quantity: number;
  brand?: string;
  category?: string;
  vendor?: string;
  compatibility?: string[];          // array of compatible car models
  engine_type?: ("Petrol" | "Diesel")[]; // array of engine types
  selling_price?: number;
  label?: string;   
}

export interface SalesState {
  records: SaleItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
}
