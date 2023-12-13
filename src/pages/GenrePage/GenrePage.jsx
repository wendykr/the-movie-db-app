import React, { useEffect, useState } from 'react';
import './GenrePage.scss';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/Button/Button';

export const GenrePage = () => {
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState('');
  const { genreId } = useParams();
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  console.log('genreId', genreId);

  useEffect(() => {
    const fetchGenreName = async () => {
      try {
        const genreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
        if (genreResponse.ok) {
          const genreData = await genreResponse.json();
          const genre = genreData.genres.find((genre) => genre.id.toString() === genreId);
          setGenreName(genre ? genre.name : 'Neznámý žánr');
        } else {
          console.error('Chyba při získávání dat o žánrech.');
        }
      } catch (error) {
        console.error('Chyba při komunikaci se serverem:', error);
      }
    };

    const fetchMoviesByGenre = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`);
        if (response.ok) {
          const data = await response.json();
          setMovies(data.results);
        } else {
          console.error('Chyba při získávání dat.');
        }
      } catch (error) {
        console.error('Chyba při komunikaci se serverem:', error);
      }
    };

    fetchGenreName();
    fetchMoviesByGenre();
  }, [apiKey, genreId]);

  return (
    <div className="page genrePage">
      <div className="container genrePage__container">
        <Button text="Zpět na seznam" />
        <h1 className="genrePage__title">Katalog filmů podle žánru - {genreName}</h1>
        <ul className="genrePage__list">
          {movies.map((movie) => (
            <li className="genrePage__item" key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};