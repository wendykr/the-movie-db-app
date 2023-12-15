import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSearch } from './context/SearchContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

function App() {
  const { setSearchQuery } = useSearch();

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    setSearchQuery("");
  }, [path]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App