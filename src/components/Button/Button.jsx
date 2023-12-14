import React from 'react';
import './Button.scss';
import { Link } from 'react-router-dom';

export const Button = ({ text }) => {
  return (
    <Link className="button" to="/"> {text} </Link>
  );
};