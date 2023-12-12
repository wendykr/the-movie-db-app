import React from 'react';
import './ErrorPage.scss';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <div className="error">
      <h2>ErrorPage</h2>
      <Link to="/">Go back to home</Link>
    </div>
  )
}
