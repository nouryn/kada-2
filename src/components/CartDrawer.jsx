import { useEffect, useRef, useState } from "react";

function CartDrawer({
  items,
  open,
  onClose,
  onQuantityChange,
  onOrderComplete,
  voucher,
}) {
  const [step, setStep] = useState("bag");
  const [orderNumber, setOrderNumber] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const paymentTimer = useRef(null);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const discount =
    voucher?.type === "discount" ? subtotal * (voucher.value / 100) : 0;
  const shipping = voucher?.type === "shipping" || subtotal >= 60 ? 0 : 6;
  const total = Math.max(0, subtotal - discount + shipping);
  const money = (amount) => amount.toFixed(2);

  const closeDrawer = () => {
    window.clearTimeout(paymentTimer.current);
    setPaymentLoading(false);
    setStep("bag");
    onClose();
  };

  const pretendPay = () => {
    if (paymentLoading) return;

    setOrderNumber(`FF-${Math.floor(1000 + Math.random() * 9000)}`);
    setPaymentLoading(true);
    setStep("payment");
    paymentTimer.current = window.setTimeout(() => {
      setPaymentLoading(false);
      setStep("receipt");
    }, 60000);
  };

  useEffect(() => () => window.clearTimeout(paymentTimer.current), []);

  const finishOrder = () => {
    onOrderComplete();
    setStep("bag");
    onClose();
  };

  return (
    <div className={`cart-layer ${open ? "open" : ""}`} aria-hidden={!open}>
      <button
        className="cart-backdrop"
        onClick={closeDrawer}
        tabIndex={open ? 0 : -1}
        aria-label="Close shopping bag"
      />
      <aside className="cart-drawer" aria-label="Shopping bag">
        <div className="cart-heading">
          <div>
            <span>
              {step === "bag"
                ? "Your little bag"
                : step === "payment"
                  ? "Pretend payment processing"
                  : step === "receipt"
                    ? "Pretend payment complete"
                    : "A happy update"}
            </span>
            <h2>
              {step === "bag"
                ? "Sweet picks ✿"
                : step === "payment"
                  ? "Making it official..."
                  : step === "receipt"
                    ? "Your receipt"
                    : "On the way!"}
            </h2>
          </div>
          <button onClick={closeDrawer} aria-label="Close shopping bag">
            ×
          </button>
        </div>

        {step === "bag" && (
          <>
            <div className="cart-items">
              {items.length === 0 && (
                <div className="empty-cart">
                  <span>🧺</span>
                  <h3>Your bag feels light</h3>
                  <p>Add something lovely from the collection.</p>
                  <button onClick={closeDrawer}>Keep browsing</button>
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
                {voucher && (
                  <div className="bag-voucher">
                    <span>{voucher.icon}</span>
                    <p>
                      <strong>{voucher.title} applied!</strong>
                      <small>
                        {voucher.code} · automatically used at checkout
                      </small>
                    </p>
                    <i>✓</i>
                  </div>
                )}
                <div>
                  <span>Subtotal</span>
                  <strong>${money(subtotal)}</strong>
                </div>
                {discount > 0 && (
                  <div className="voucher-saving">
                    <span>Prize saving</span>
                    <strong>−${money(discount)}</strong>
                  </div>
                )}
                {voucher?.type === "gift" && (
                  <div className="voucher-saving">
                    <span>🎀 Mystery item</span>
                    <strong>FREE</strong>
                  </div>
                )}
                <p>
                  {shipping === 0
                    ? "Free pretend shipping unlocked! ✿"
                    : `$${shipping} pretend shipping · Free over $60`}
                </p>
                <button onClick={pretendPay}>
                  Pay ${money(total)} <span>♡</span>
                </button>
                <small>No real payment, this button is just for fun.</small>
              </div>
            )}
          </>
        )}

        {step === "payment" && (
          <div
            className="receipt-payment-view"
            role="status"
            aria-live="polite"
          >
            <div className="bag-spinner" aria-hidden="true">
              ✿
            </div>
            <h3>Processing your pretend payment</h3>
            <p>Your receipt will be ready in about one minute.</p>
            <div className="receipt-progress" aria-hidden="true">
              <span />
            </div>
            <small>Please keep this little window open.</small>
          </div>
        )}

        {step === "receipt" && (
          <div className="receipt-view">
            <div className="receipt-paper">
              <div className="receipt-logo">✿ FORM & FABLE ✿</div>
              <p className="receipt-number">Order {orderNumber}</p>
              <div className="receipt-lines">
                {items.map((item) => (
                  <div key={item.id}>
                    <span>
                      {item.quantity} × {item.name}
                    </span>
                    <strong>${item.price * item.quantity}</strong>
                  </div>
                ))}
              </div>
              <div className="receipt-totals">
                {discount > 0 && (
                  <div>
                    <span>{voucher.title}</span>
                    <strong>−${money(discount)}</strong>
                  </div>
                )}
                {voucher?.type === "gift" && (
                  <div>
                    <span>🎀 Mystery item</span>
                    <strong>FREE</strong>
                  </div>
                )}
                <div>
                  <span>Shipping</span>
                  <strong>{shipping ? `$${shipping}` : "FREE"}</strong>
                </div>
                <div className="receipt-grand-total">
                  <span>Total</span>
                  <strong>${money(total)}</strong>
                </div>
              </div>
              <p className="receipt-thanks">
                Thank you for your very pretend purchase! ♡
              </p>
            </div>
            <button
              className="receipt-next-button"
              onClick={() => setStep("shipping")}
            >
              Where is my package? →
            </button>
          </div>
        )}

        {step === "shipping" && (
          <div className="shipping-view">
            <div className="delivery-sky">
              <span className="delivery-cloud cloud-a">☁</span>
              <span className="delivery-cloud cloud-b">☁</span>
              <span className="delivery-sparkle">✦</span>
              <div className="delivery-package">
                📦<b>🎀</b>
              </div>
              <div className="delivery-road" />
            </div>
            <h3>Your cute package is on the way!</h3>
            <p>
              Bunny Post packed order <strong>{orderNumber}</strong> with extra
              care, one tiny bow, and absolutely no rush.
            </p>
            <div className="delivery-steps">
              <span className="done">✓ Paid</span>
              <i />
              <span className="done">✓ Packed</span>
              <i />
              <span>♡ On the way</span>
            </div>
            <button onClick={finishOrder}>Yay, done!</button>
          </div>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
