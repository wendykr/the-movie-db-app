import React from 'react';
import './Search.scss';
import { IoSearchSharp } from "react-icons/io5";
import { useSearch } from '../../context/SearchContext';

export const Search = () => {
  const { handleSearchChange, searchQuery, setSearchQuery } = useSearch();

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    handleSearchChange && handleSearchChange(event.target.value);
  };

  return (
    <form className="search__form">
      <input
        className="search__input"
        type="text"
        id="searchInput"
        onChange={handleSearch}
        value={searchQuery}
        placeholder="Hledej film..."
      />
      <label className="search__label" htmlFor="searchInput">
        <IoSearchSharp className="icon-search" />
      </label>
    </form>
  );
};