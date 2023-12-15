import React from 'react';
import { useLocation } from 'react-router-dom';
import './Header.scss';
import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';

export const Header = () => {

  const location = useLocation();
  const isHeaderHidden = location.pathname === '/';

  return (
    <div className="header">
      <div className="header__container">
        <Logo />
        {isHeaderHidden && (
          <Search />
        )}
      </div>
    </div>
  );
};