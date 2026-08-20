import { useState } from "react";

function ProductCard({ product, onAdd }) {
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  return (
    <article className="product-card">
      <div
        className="product-image-wrap"
        style={{ "--card-accent": product.accent }}
      >
        <img src={product.image} alt={product.name} className="product-image" />
        <span className="product-badge">{product.badge}</span>
        <button
          className={`heart-button ${liked ? "liked" : ""}`}
          type="button"
          onClick={() => setLiked((value) => !value)}
          aria-label={`${liked ? "Remove" : "Save"} ${product.name}`}
        >
          {liked ? "♥" : "♡"}
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
