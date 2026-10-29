import React from 'react';
export default function SearchBar({ query, setQuery, onSearch, loading }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSearch();
  }

  return (
    <section className="search-panel" aria-labelledby="search-title">
      <div className="search-copy">
        <h2 id="search-title">Check the weather</h2>
        <p>Where would you like to go?</p>
      </div>
      <form className="search-form" onSubmit={handleSubmit}>
        <label className="visually-hidden" htmlFor="city-input">City name</label>
        <div className="search-controls">
          <span className="search-symbol" aria-hidden="true">⌕</span>
          <input id="city-input" type="text" placeholder="Enter a city (e.g. Beirut)"
            value={query} onChange={(event) => setQuery(event.target.value)} maxLength="80" />
          <button type="submit" disabled={loading}>Search <span aria-hidden="true">→</span></button>
        </div>
      </form>
    </section>
  );
}
