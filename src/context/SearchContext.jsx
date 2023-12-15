import React, { createContext, useContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [countMovies, setCountMovies] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [handleSearchChange, setHandleSearchChange] = useState(null);

  const onSearchChange = (query) => {
    setSearchQuery(query);
    if (handleSearchChange) {
      handleSearchChange(query);
    }
  };

  return (
    <SearchContext.Provider value={{
      countMovies,
      setCountMovies,
      searchQuery,
      setSearchQuery,
      onSearchChange,
      handleSearchChange,
      setHandleSearchChange,
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);