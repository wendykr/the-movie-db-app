import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Search.scss';
import { IoSearchSharp } from "react-icons/io5";
import { useSearch } from '../../context/SearchContext';
import { Logo } from '../Logo/Logo';

export const Search = () => {
  const { countMovies, handleSearchChange } = useSearch();
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const isHeaderHidden = location.pathname === '/';

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    handleSearchChange && handleSearchChange(event.target.value);
  };

  return (
    <div className="search">
      <div className="search__container">
        <Logo />
        {/* <p>Počet zobrazených filmů {countMovies}</p> */}
          {isHeaderHidden && (
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
          )}
      </div>
    </div>
  );
};