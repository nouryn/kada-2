import { useCallback, useEffect, useMemo, useState } from "react";
import { getProducts } from "../service/productService";
import Hero from "../components/Hero";
import Counter from "../components/Counter";
import PhotoBooth from "../components/PhotoBooth";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import ProductSkeleton from "../components/ProductSkeleton";
import ErrorMessage from "../components/ErrorMessage";

function ProductListPage({ wishlist, onAdd, onToggleWishlist }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    sort: "default",
  });
  const [retryToken, setRetryToken] = useState(0);

  const retryProducts = () => {
    setLoading(true);
    setError("");
    setRetryToken((token) => token + 1);
  };

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [retryToken]);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const filteredProducts = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase();
    const matchingProducts = products.filter((product) => {
      const matchesSearch =
        !searchTerm || product.name.toLowerCase().includes(searchTerm);
      const matchesCategory =
        filters.category === "All" || product.category === filters.category;

      return matchesSearch && matchesCategory;
    });

    return [...matchingProducts].sort((firstProduct, secondProduct) => {
      if (filters.sort === "name-asc") {
        return firstProduct.name.localeCompare(secondProduct.name);
      }
      if (filters.sort === "price-desc") {
        return secondProduct.price - firstProduct.price;
      }
      if (filters.sort === "price-asc") {
        return firstProduct.price - secondProduct.price;
      }
      return 0;
    });
  }, [filters, products]);

  const updateFilter = useCallback((name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
  }, []);

  return (
    <>
      <Hero productCount={products.length} />
      <Counter />
      <section
        className="products-section"
        id="shop"
        aria-labelledby="products-title"
      >
        <div className="section-title">
          <div>
            <p>Shop tiny joys</p>
            <h2 id="products-title">Lovely things for ordinary days.</h2>
          </div>
          <span>
            {loading
              ? "Finding little joys"
              : `${filteredProducts.length} little finds`}
          </span>
        </div>
        {loading ? (
          <div className="product-grid" aria-label="Loading products">
            {Array.from({ length: 6 }, (_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <ErrorMessage error={error} onRetry={retryProducts} />
        ) : (
          <>
            <ProductFilters
              categories={categories}
              filters={filters}
              onFilterChange={updateFilter}
            />
            {filteredProducts.length > 0 ? (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={onAdd}
                    wished={wishlist.some((item) => item.id === product.id)}
                    onToggleWishlist={onToggleWishlist}
                  />
                ))}
              </div>
            ) : (
              <p className="products-empty">
                No little finds match those filters.
              </p>
            )}
          </>
        )}
      </section>
      <PhotoBooth />
    </>
  );
}

export default ProductListPage;
