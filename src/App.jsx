import { useMemo, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import products from './data/products'
import './App.css'

const categories = ['All', ...new Set(products.map((product) => product.category))]

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const visibleProducts = useMemo(() => (
    activeCategory === 'All'
      ? products
      : products.filter((product) => product.category === activeCategory)
  ), [activeCategory])

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const addToCart = (product, quantity) => {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id)
      return found
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { ...product, quantity }]
    })
    setNotice(`${product.name} is tucked into your bag!`)
    window.setTimeout(() => setNotice(''), 2200)
  }

  const changeCartQuantity = (id, amount) => {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0))
  }

  return (
    <div className="storefront">
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <main>
        <Hero productCount={products.length} />
        <section className="products-section" id="shop" aria-labelledby="products-title">
          <div className="section-title">
            <div><p>Shop tiny joys</p><h2 id="products-title">Lovely things for ordinary days.</h2></div>
            <span>{visibleProducts.length} little finds</span>
          </div>
          <div className="category-filters" aria-label="Filter products by category">
            {categories.map((category) => (
              <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>
            ))}
          </div>
          <div className="product-grid">
            {visibleProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer items={cart} open={cartOpen} onClose={() => setCartOpen(false)} onQuantityChange={changeCartQuantity} />
      <div className={`cart-notice ${notice ? 'visible' : ''}`} role="status" aria-live="polite">✿ {notice}</div>
    </div>
  )
}

export default App
