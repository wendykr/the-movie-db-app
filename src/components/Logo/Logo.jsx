import React from 'react';
import './Logo.scss';
import { Link } from 'react-router-dom';

export const Logo = () => {
  const isLocalhost = window.location.href.startsWith('http://localhost') || window.location.href.startsWith('http://127.0.0.1');

  return (
    <Link className="logo" to="/">
      <img className="logo__image" src={isLocalhost ? "/public/images/tmdb-logo.svg" : "/images/tmdb-logo.svg"} alt="TMDB Logo" />
    </Link>
  );
};