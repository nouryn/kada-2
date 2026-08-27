import { useState, type CSSProperties, type SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/domain-models";

interface CardProps {
  product: Product;
  onAdd: (product: Product, quantity: number) => void;
  wished: boolean;
  onToggleWishlist: (product: Product) => void;
}

function ProductCard({
  product,
  onAdd,
  wished,
  onToggleWishlist,
}: CardProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [imageFailed, setImageFailed] = useState<boolean>(false);
  const imageStyle = { "--card-accent": product.accent } as CSSProperties;
  const handleImageError = (_event: SyntheticEvent<HTMLImageElement>) => {
    setImageFailed(true);
  };

  return (
    <article className="product-card">
      <div className="product-image-wrap" style={imageStyle}>
        {imageFailed ? (
          <span className="product-fallback" role="img" aria-label={product.name}>
            {product.fallback}
          </span>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            onError={handleImageError}
          />
        )}
        <span className="product-badge">{product.badge}</span>
        <button
          className={`heart-button ${wished ? "liked" : ""}`}
          type="button"
          onClick={() => onToggleWishlist(product)}
          aria-label={`${wished ? "Remove" : "Save"} ${product.name}`}
        >
          {wished ? "♥" : "♡"}
        </button>
      </div>
      <div className="product-info">
        <div className="product-heading">
          <div>
            <span>{product.category}</span>
            <h3>{product.name}</h3>
          </div>
          <p>${product.price}</p>
        </div>
        <p className="product-description">{product.description}</p>
        <Link className="details-button" to={`/products/${product.id}`}>
          View details <span>→</span>
        </Link>
        <div className="product-meta">
          <span>Colour</span>
          <strong>
            <i style={{ background: product.accent }} />
            {product.color}
          </strong>
        </div>
        <div className="purchase-row">
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
          <button
            className="add-button"
            type="button"
            onClick={() => onAdd(product, quantity)}
          >
            Add to bag <span>✦</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
