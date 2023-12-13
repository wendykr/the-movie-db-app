import React from 'react';
import './ErrorPage.scss';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <div className="page error">
      <h1 className="error__title">Stránka nenalezena</h1>
      <p className="error__text">Tuto stránku ještě nemám nebo jde o chybný odkaz.</p>
      <Link className="error__link" to="/">Zpět na hlavní stranu</Link>
    </div>
  )
}
