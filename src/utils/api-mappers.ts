import type { ApiProduct } from "../types/api-models";
import type { Product } from "../types/domain-models";

const accents = ["#eadcc9", "#eee5d5", "#f2d9df", "#ddd8ed", "#dce8da"];

/** Converts a raw DummyJSON product into the product shape used by the UI. */
export const mapApiProductToProduct = (product: ApiProduct): Product => ({
  id: product.id,
  name: product.title,
  brand: product.brand || "DummyJSON",
  category: product.category,
  price: product.price,
  description: product.description,
  image: product.thumbnail || product.images?.[0],
  color: product.brand || "Everyday favourite",
  accent: accents[product.id % accents.length],
  badge: product.discountPercentage > 10 ? "Lovely value" : "New find",
  fallback: "💄",
});
