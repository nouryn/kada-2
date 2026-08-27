function Header({
  cartCount,
  onCartOpen,
  wishlistCount,
  onWishlistOpen,
  user,
  onLoginOpen,
  onLogout,
}) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Form and Fable home">
        <span>✿</span> FORM & FABLE
      </a>
      <nav aria-label="Main navigation">
        <a href="#shop">Shop</a>
        <a href="#photobooth">Photo booth</a>
        <a href="#about">Our story</a>
      </nav>
      <div className="header-actions">
        {user ? (
          <div className="user-menu">
            <span>Hi, {user.name.split(" ")[0]} ✿</span>
            <button onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <button className="login-button" type="button" onClick={onLoginOpen}>
            Login
          </button>
        )}
        <button
          className="wishlist-button"
          type="button"
          onClick={onWishlistOpen}
          aria-label={`Open wishlist with ${wishlistCount} items`}
        >
          ♡ <span>{wishlistCount}</span>
        </button>
        <button
          className="cart-button"
          type="button"
          onClick={onCartOpen}
          aria-label={`Open shopping bag with ${cartCount} items`}
        >
          Bag <span>{cartCount}</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
