import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const decrease = () => setCount((current) => Math.max(0, current - 1));
  const increase = () => setCount((current) => current + 1);
  const reset = () => setCount(0);

  return (
    <section className="counter-section" aria-labelledby="counter-title">
      <div className="counter-copy">
        <span>Today’s tiny ritual</span>
        <h2 id="counter-title">Count your little joys</h2>
        <p>
          Tap the flower whenever something makes your day a little brighter.
        </p>
      </div>
      <div className="counter-card">
        <button
          className="counter-side-button"
          type="button"
          onClick={decrease}
          disabled={count === 0}
          aria-label="Decrease joy count"
        >
          −
        </button>
        <div className="counter-value" aria-live="polite">
          <span>✿</span>
          <strong>{count}</strong>
          <small>{count === 1 ? "little joy" : "little joys"}</small>
        </div>
        <button
          className="counter-side-button"
          type="button"
          onClick={increase}
          aria-label="Increase joy count"
        >
          +
        </button>
        <button
          className="counter-reset"
          type="button"
          onClick={reset}
          disabled={count === 0}
        >
          reset
        </button>
      </div>
    </section>
  );
}

export default Counter;
