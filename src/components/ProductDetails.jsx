import { useState } from "react";

function ProductDetails({ product, onClose, onAdd, wished, onToggleWishlist }) {
  const [quantity, setQuantity] = useState(1);
  const [imageFailed, setImageFailed] = useState(false);
  const [actionError, setActionError] = useState("");

  if (!product) return null;

  const addProduct = () => {
    try {
      setActionError("");
      onAdd(product, quantity);
      onClose();
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "We couldn't add this product to your bag.",
      );
    }
  };

  return (
    <div
      className="product-details-layer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-details-title"
    >
      <button
        className="product-details-backdrop"
        onClick={onClose}
        aria-label="Close product details"
      />
      <article className="product-details-card">
        <button
          className="product-details-close"
          onClick={onClose}
          aria-label="Close product details"
        >
          ×
        </button>
        <div
          className="product-details-image-wrap"
          style={{ "--card-accent": product.accent }}
        >
          {imageFailed ? (
            <span
              className="product-fallback"
              role="img"
              aria-label={product.name}
            >
              {product.fallback}
            </span>
          ) : (
            <img
              src={product.image}
              alt={product.name}
              className="product-details-image"
              onError={() => setImageFailed(true)}
            />
          )}
          <span className="product-badge">{product.badge}</span>
        </div>
        <div className="product-details-copy">
          <div className="product-details-heading">
            <div>
              <span>{product.category}</span>
              <h2 id="product-details-title">{product.name}</h2>
            </div>
            <strong>${product.price}</strong>
          </div>
          <p className="product-details-description">{product.description}</p>
          <div className="product-details-meta">
            <span>Colour</span>
            <strong>
              <i style={{ background: product.accent }} />
              {product.color}
            </strong>
          </div>
          <div className="product-details-actions">
            <div className="quantity" aria-label="Quantity selector">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button className="add-button" type="button" onClick={addProduct}>
              Add to bag <span>✦</span>
            </button>
          </div>
          {actionError && (
            <p className="products-error" role="alert">
              {actionError}
            </p>
          )}
          <button
            className={`details-wishlist-button ${wished ? "liked" : ""}`}
            type="button"
            onClick={() => onToggleWishlist(product)}
          >
            {wished ? "♥ Saved to wishlist" : "♡ Save to wishlist"}
          </button>
        </div>
      </article>
    </div>
  );
}

export default ProductDetails;
