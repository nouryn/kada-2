import { useState } from 'react'

function ProductCard({ product, onAdd }) {
  const [quantity, setQuantity] = useState(1)

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" />
        <span className="product-category">{product.category}</span>
      </div>
      <div className="product-info">
        <div className="product-heading"><h3>{product.name}</h3><p>${product.price}</p></div>
        <p className="product-description">{product.description}</p>
        <div className="product-meta"><span>Colour</span><strong><i />{product.color}</strong></div>
        <div className="purchase-row">
          <div className="quantity" aria-label="Quantity selector">
            <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button>
            <span>{quantity}</span>
            <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">+</button>
          </div>
          <button className="add-button" type="button" onClick={() => onAdd(product, quantity)}>Add to bag</button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
