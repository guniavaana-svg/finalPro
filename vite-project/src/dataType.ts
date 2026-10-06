export interface StationeryDataType{
  id: number;
  name?: string;
  description?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  sku?: string;
  price: number;
  currency?: string;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  availability?: string;
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  weight?: string;
  tags?: string[];
  thumbnail?: string;
  images?: string[];
  specifications: Specification[];
}
interface Specification {
  size?: string;
  pages?: number;
  cover?: string;
  ruling?: string;
  color?: string;
  paperWeight?: string;
}

