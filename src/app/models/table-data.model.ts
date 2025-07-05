export interface BaseRow {
  customerName: string;
  range30: number;
  rane60: number;
  rane90: number;
  total: number;
  children?: (CustomerRow | PORow | InvoiceRow)[];
}

export interface CustomerRow extends BaseRow {
  id: number;
  children?: PORow[];
}

export interface PORow extends BaseRow {
  poNumber: number;
  children?: InvoiceRow[];
}

export interface InvoiceRow extends BaseRow {
  invNumber: number;
}

export type SortField = 'customerName' | 'range30' | 'rane60' | 'rane90' | 'total';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
} 