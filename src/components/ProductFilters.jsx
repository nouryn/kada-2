import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/debounce";

function ProductFilters({ categories, filters, onFilterChange }) {
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    onFilterChange("search", debouncedSearch);
  }, [debouncedSearch, onFilterChange]);

  return (
    <form
      className="product-filters"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="product-search">
        <span>Search products</span>
        <input
          type="search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Search little joys"
        />
      </label>
      <label>
        <span>Category</span>
        <select
          value={filters.category}
          onChange={(event) => onFilterChange("category", event.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Sort by</span>
        <select
          value={filters.sort}
          onChange={(event) => onFilterChange("sort", event.target.value)}
        >
          <option value="default">Recommended</option>
          <option value="name-asc">A to Z</option>
          <option value="price-desc">Price: high to low</option>
          <option value="price-asc">Price: low to high</option>
        </select>
      </label>
    </form>
  );
}

export default ProductFilters;
