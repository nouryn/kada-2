function ProductSkeleton() {
  return (
    <article className="product-skeleton" aria-hidden="true">
      <div className="skeleton-image" />
      <div className="skeleton-line skeleton-category" />
      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line skeleton-copy" />
      <div className="skeleton-line skeleton-copy short" />
    </article>
  );
}

export default ProductSkeleton;
