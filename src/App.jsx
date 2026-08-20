import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import Footer from './components/Footer'
import './App.css'

const products = [
  {
    id: 1,
    name: 'Everyday Canvas Tote',
    category: 'Carry',
    price: 42,
    description: 'A structured cotton tote designed for errands, workdays, and everything between.',
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85',
    color: 'Natural',
  },
  {
    id: 2,
    name: 'Handmade Ceramic Cup',
    category: 'Home',
    price: 28,
    description: 'A softly speckled stoneware cup, shaped and glazed by hand for slow morning drinks.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85',
    color: 'Oat',
  },
]

function App() {
  const [cartCount, setCartCount] = useState(0)
  const [notice, setNotice] = useState('')

  const addToCart = (product, quantity) => {
    setCartCount((count) => count + quantity)
    setNotice(`${quantity} × ${product.name} added to your bag.`)
    window.setTimeout(() => setNotice(''), 2400)
  }

  return (
    <div className="storefront">
      <Header cartCount={cartCount} />
      <main>
        <Hero />
        <section className="products-section" id="shop" aria-labelledby="products-title">
          <div className="section-title">
            <p>Shop the collection</p>
            <h2 id="products-title">Two objects, thoughtfully made.</h2>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={addToCart} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <div className={`cart-notice ${notice ? 'visible' : ''}`} role="status" aria-live="polite">{notice}</div>
    </div>
  )
}

export default App
