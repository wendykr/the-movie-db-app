import React from 'react';
import './MovieSimilar.scss';
import { Link } from 'react-router-dom';

export const MovieSimilar = ({ similarMovie, handleSimilarMovieClick }) => {
  return (
    <>
      <Link className="similarMovie__link" to={`/movie/${similarMovie.id}`} onClick={handleSimilarMovieClick}>
        <img
          className="similarMovie__image"
          src={`https://image.tmdb.org/t/p/w200/${similarMovie.poster_path}`}
          alt={`Poster for ${similarMovie.title}`}
          onError={(e) => {
            e.target.src = '/public/images/no-image-available.jpg';
          }}
        />
      </Link>
    </>
  )
}
