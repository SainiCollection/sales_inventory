export interface InventoryItem {
  id: number | string;
  sku?: string;                      // image URL
  name: string;
  quantity: number;
  brand?: string;
  category?: string;
  vendor?: string;
  compatibility?: string[];          // array of compatible car models
  engine_type?: ("Petrol" | "Diesel")[]; // array of engine types
  purchase_price?: number;
  selling_price?: number;
  vendor_price?: number;
  label?: string;                    // optional
}


export interface InventoryState {
  items: InventoryItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
}
