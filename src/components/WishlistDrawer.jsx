function WishlistDrawer({ items, open, onClose, onRemove, onMoveToBag }) {
  return (
    <div
      className={`cart-layer wishlist-layer ${open ? "open" : ""}`}
      aria-hidden={!open}
    >
      <button
        className="cart-backdrop"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        aria-label="Close wishlist"
      />
      <aside className="cart-drawer wishlist-drawer" aria-label="Wishlist">
        <div className="cart-heading">
          <div>
            <span>Your saved treasures</span>
            <h2>Wishlist ♡</h2>
          </div>
          <button onClick={onClose} aria-label="Close wishlist">
            ×
          </button>
        </div>
        <div className="wishlist-items">
          {items.length === 0 && (
            <div className="empty-cart">
              <span>💌</span>
              <h3>No wishes just yet</h3>
              <p>Tap a heart on any product to keep it here.</p>
              <button onClick={onClose}>Find something lovely</button>
            </div>
          )}
          {items.map((item) => (
            <article className="wishlist-item" key={item.id}>
              <div className="wishlist-image">
                {" "}
                <img src={item.image} alt="" />
                <button
                  onClick={() => onRemove(item.id)}
                  aria-label={`Remove ${item.name} from wishlist`}
                >
                  ×
                </button>
              </div>
              <div>
                <span>{item.category}</span>
                <h3>{item.name}</h3>
                <p>
                  ${item.price} · {item.color}
                </p>
                <button onClick={() => onMoveToBag(item)}>Move to bag ✦</button>
              </div>
            </article>
          ))}
        </div>
        {items.length > 0 && (
          <div className="wishlist-footer">
            <span>✿</span>
            <p>
              {items.length} {items.length === 1 ? "wish" : "wishes"} saved for
              later
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}

export default WishlistDrawer;
