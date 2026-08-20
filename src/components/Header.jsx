function Header({ cartCount, onCartOpen }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Form and Fable home"><span>✿</span> FORM & FABLE</a>
      <nav aria-label="Main navigation"><a href="#shop">Shop</a><a href="#about">Our story</a></nav>
      <button className="cart-button" type="button" onClick={onCartOpen} aria-label={`Open shopping bag with ${cartCount} items`}>Bag <span>{cartCount}</span></button>
    </header>
  )
}

export default Header
