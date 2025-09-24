export interface InventoryItem {
  id: number | string;
  sku?: string;
  name: string;
  quantity: number;
  brand?: string;
  category?: string;
  compatibility?: string;
  price?: number;
  label?: string;
}

export interface InventoryState {
  items: InventoryItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
}
