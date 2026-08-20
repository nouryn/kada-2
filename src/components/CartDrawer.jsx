function CartDrawer({ items, open, onClose, onQuantityChange }) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className={`cart-layer ${open ? "open" : ""}`} aria-hidden={!open}>
      <button
        className="cart-backdrop"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        aria-label="Close shopping bag"
      />
      <aside className="cart-drawer" aria-label="Shopping bag">
        <div className="cart-heading">
          <div>
            <span>Your little bag</span>
            <h2>Sweet picks ✿</h2>
          </div>
          <button onClick={onClose} aria-label="Close shopping bag">
            ×
          </button>
        </div>
        <div className="cart-items">
          {items.length === 0 && (
            <div className="empty-cart">
              <span>🧺</span>
              <h3>Your bag feels light</h3>
              <p>Add something lovely from the collection.</p>
              <button onClick={onClose}>Keep browsing</button>
            </div>
          )}
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt="" />
              <div>
                <h3>{item.name}</h3>
                <p>
                  ${item.price} · {item.color}
                </p>
                <div className="mini-quantity">
                  <button
                    onClick={() => onQuantityChange(item.id, -1)}
                    aria-label={`Remove one ${item.name}`}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => onQuantityChange(item.id, 1)}
                    aria-label={`Add one ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
              <strong>${item.price * item.quantity}</strong>
            </article>
          ))}
        </div>
        {items.length > 0 && (
          <div className="cart-summary">
            <div>
              <span>Subtotal</span>
              <strong>${subtotal}</strong>
            </div>
            <p>Shipping is calculated at checkout.</p>
            <button
              onClick={() =>
                window.alert("A real checkout can be connected next!")
              }
            >
              Continue to checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
