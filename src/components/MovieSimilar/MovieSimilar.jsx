import React from 'react';
import './MovieSimilar.scss';
import { Link } from 'react-router-dom';

export const MovieSimilar = ({ similarMovie, handleSimilarMovieClick }) => {
  const isLocalhost = window.location.href.startsWith('http://localhost') || window.location.href.startsWith('http://127.0.0.1:5173');

  return (
    <>
      <Link className="similarMovie__link" to={`/movie/${similarMovie.id}`} onClick={handleSimilarMovieClick}>
        <img
          className="similarMovie__image"
          src={`https://image.tmdb.org/t/p/w200/${similarMovie.poster_path}`}
          alt={`Poster for ${similarMovie.title}`}
          onError={(e) => {
            e.target.src = isLocalhost ? '/public/images/no-image-available.jpg' : '/images/no-image-available.jpg';
          }}
        />
      </Link>
    </>
  )
}