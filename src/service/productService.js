import axiosInstance from "../api/axiosInstance";

const accents = ["#eadcc9", "#eee5d5", "#f2d9df", "#ddd8ed", "#dce8da"];

const normalizeProduct = (product) => ({
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

export const getProducts = async () => {
  const response = await axiosInstance.get("/products?limit=30");
  return response.data.products.map(normalizeProduct);
};

export const getProduct = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return normalizeProduct(response.data);
};
