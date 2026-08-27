/** Product shape used by the storefront UI. */
export type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  image?: string;
  color: string;
  accent: string;
  badge: string;
  fallback: string;
};
