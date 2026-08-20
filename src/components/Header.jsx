function Header({ cartCount }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Form home">FORM</a>
      <nav aria-label="Main navigation">
        <a href="#shop">Shop</a>
        <a href="#about">About</a>
      </nav>
      <button className="cart-button" type="button" aria-label={`Shopping bag with ${cartCount} items`}>
        Bag <span>{cartCount}</span>
      </button>
    </header>
  )
}

export default Header
