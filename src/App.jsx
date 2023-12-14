import React from 'react';
import { Outlet } from 'react-router-dom';
import { Search } from './components/Search/Search';
import { Footer } from './components/Footer/Footer';

function App() {

  return (
    <>
      <Search />
      <Outlet />
      <Footer />
    </>
  )
}

export default App