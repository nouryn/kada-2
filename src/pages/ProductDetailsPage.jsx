import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../service/productService";
import ProductDetails from "../components/ProductDetails";
import ProductSkeleton from "../components/ProductSkeleton";
import ErrorMessage from "../components/ErrorMessage";

function ProductDetailsPage({ wishlist, onAdd, onToggleWishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryToken, setRetryToken] = useState(0);

  const retryProduct = () => {
    setLoading(true);
    setError("");
    setRetryToken((token) => token + 1);
  };

  useEffect(() => {
    getProduct(id)
      .then(setProduct)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [id, retryToken]);

  if (loading) {
    return (
      <div className="details-page-state">
        <ProductSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-page-state">
        <ErrorMessage error={error} onRetry={retryProduct} />
      </div>
    );
  }

  return (
    <ProductDetails
      product={product}
      onClose={() => navigate(-1)}
      onAdd={onAdd}
      wished={wishlist.some((item) => item.id === product.id)}
      onToggleWishlist={onToggleWishlist}
    />
  );
}

export default ProductDetailsPage;
