/** Raw product data returned by the DummyJSON products API. */
export type ApiProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  brand?: string;
  thumbnail?: string;
  images?: string[];
};

/** Response returned by the DummyJSON products-list endpoint. */
export type ApiProductsResponse = {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
};
