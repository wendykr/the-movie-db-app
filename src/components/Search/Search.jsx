
import React, { useState } from 'react';
import './Search.scss';
import { FaSearch } from "react-icons/fa";

export const Search = ({ onSearchChange, countMovie }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    onSearchChange(event.target.value);
  };

  return (
    <div className="search">
      Počet zobrazených filmů {countMovie}
      <form className="search__form">
        <input
          className="search__input"
          type="text"
          id="searchInput"
          onChange={handleSearch}
          value={searchQuery}
          placeholder="Hledej film..."
        />
        <label className="search__label" htmlFor="searchInput"><FaSearch className="icon-search" /></label>
      </form>
    </div>
  );
};
