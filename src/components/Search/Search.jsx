
import React, { useState } from 'react';
import './Search.scss';

export const Search = ({ onSearchChange, countMovie }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    onSearchChange(event.target.value);
  };

  return (
    <div className="search">
      Count of displayed movies {countMovie}
      <form className="search__form">
        <label className="search__label" htmlFor="searchInput">Search</label>
        <input
          className="search__input"
          type="text"
          id="searchInput"
          onChange={handleSearch}
          value={searchQuery}
          placeholder="Enter movie title..."
        />
      </form>
    </div>
  );
};
