import React from 'react';
import './Movie.scss';
import { Link } from 'react-router-dom';

export const Movie = ({ oneMovie, handleMovieClick }) => {

  return (
    <Link className="movie" to={`/movie/${oneMovie.id}`} 
      onClick={handleMovieClick}>
      <div className="movie__container">
        <img
          className="movie__image"
          src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
          alt={`Poster for ${oneMovie.title}`}
        />
      </div>
      <h2 className="movie__title">{oneMovie.title}</h2>
    </Link>
  );
};
