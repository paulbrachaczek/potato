export interface Sales {
  column?: (ColumnEntity)[] | null;
  data?: (DataEntity)[] | null;
}
export interface ColumnEntity {
  header: string;
  field?: string | null;
  subHeaders?: (SubHeadersEntity)[] | null;
}
export interface SubHeadersEntity {
  header: string;
  field: string;
}
export interface DataEntity {
  productID: string;
  productName: string;
  salesQ1: number;
  salesQ2: number;
  salesQ3: number;
  salesQ4: number;
}
