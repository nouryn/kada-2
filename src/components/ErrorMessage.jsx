function ErrorMessage({ error, onRetry }) {
  if (!error) return null;

  return (
    <div className="products-error" role="alert">
      <span aria-hidden="true">☁</span>
      <h3>We couldn't load the products.</h3>
      <p>{error}</p>
      <button type="button" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}

export default ErrorMessage;
