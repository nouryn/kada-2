import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import WishlistDrawer from "./components/WishlistDrawer";
import RewardsGame from "./components/RewardsGame";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

function App() {
  const [pageLoading, setPageLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [welcomeName, setWelcomeName] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [activeVoucher, setActiveVoucher] = useState(null);
  const [bagLoading, setBagLoading] = useState(false);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setPageLoading(false), 1200);
    return () => window.clearTimeout(loadingTimer);
  }, []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const openBag = () => {
    if (bagLoading) return;
    setBagLoading(true);
    window.setTimeout(() => {
      setBagLoading(false);
      setCartOpen(true);
    }, 1000);
  };

  const addToCart = (product, quantity) => {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      return found
        ? current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...current, { ...product, quantity }];
    });
    setNotice(`${product.name} is tucked into your bag!`);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const changeCartQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleLogin = (newUser) => {
    setUser(newUser);
    setLoginOpen(false);
    setWelcomeName(newUser.name.split(" ")[0]);
    window.setTimeout(() => setWelcomeName(""), 3200);
  };

  const toggleWishlist = (product) => {
    const alreadySaved = wishlist.some((item) => item.id === product.id);
    setWishlist((current) =>
      alreadySaved
        ? current.filter((item) => item.id !== product.id)
        : [...current, product],
    );
    setNotice(
      alreadySaved
        ? `${product.name} left your wishlist.`
        : `${product.name} was added to your wishlist!`,
    );
    window.setTimeout(() => setNotice(""), 2200);
  };

  const moveWishlistItemToBag = (product) => {
    addToCart(product, 1);
    setWishlist((current) => current.filter((item) => item.id !== product.id));
  };

  return (
    <div className="storefront">
      {pageLoading && (
        <div
          className="bag-loading page-loading"
          role="status"
          aria-live="polite"
        >
          <div className="bag-loading-card">
            <div className="bag-spinner" aria-hidden="true">
              ✿
            </div>
            <strong>Setting the scene...</strong>
            <span>Gathering your little joys</span>
          </div>
        </div>
      )}
      {bagLoading && (
        <div className="bag-loading" role="status" aria-live="polite">
          <div className="bag-loading-card">
            <div className="bag-spinner" aria-hidden="true">
              ✿
            </div>
            <strong>Opening your bag...</strong>
            <span>Gathering your little picks</span>
          </div>
        </div>
      )}
      <RewardsGame
        activeVoucher={activeVoucher}
        onWin={setActiveVoucher}
        onOpenBag={openBag}
      />
      <Header
        cartCount={cartCount}
        onCartOpen={openBag}
        wishlistCount={wishlist.length}
        onWishlistOpen={() => setWishlistOpen(true)}
        user={user}
        onLoginOpen={() => setLoginOpen(true)}
        onLogout={() => setUser(null)}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <ProductListPage
                wishlist={wishlist}
                onAdd={addToCart}
                onToggleWishlist={toggleWishlist}
              />
            }
          />
          <Route
            path="/products/:id"
            element={
              <ErrorBoundary
                title="Unable to show product details"
                message="Something unexpected happened. This little product moment wandered off, but we can try to find it again."
              >
                <ProductDetailsPage
                  wishlist={wishlist}
                  onAdd={addToCart}
                  onToggleWishlist={toggleWishlist}
                />
              </ErrorBoundary>
            }
          />
        </Routes>
      </main>
      <Footer />
      <CartDrawer
        items={cart}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onQuantityChange={changeCartQuantity}
        voucher={activeVoucher}
        onOrderComplete={() => {
          setCart([]);
          setActiveVoucher(null);
        }}
      />
      <WishlistDrawer
        items={wishlist}
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        onRemove={(id) =>
          setWishlist((current) => current.filter((item) => item.id !== id))
        }
        onMoveToBag={moveWishlistItemToBag}
      />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={handleLogin}
      />
      <div
        className={`cart-notice ${notice ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        ✿ {notice}
      </div>
      <div
        className={`welcome-toast ${welcomeName ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        <span className="welcome-sparkle sparkle-left">✦</span>
        <span className="welcome-icon">✿</span>
        <strong>Welcome, {welcomeName}!</strong>
        <small>Your little corner of whimsy is ready.</small>
        <span className="welcome-sparkle sparkle-right">✧</span>
      </div>
    </div>
  );
}

function RoutedApp() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default RoutedApp;
