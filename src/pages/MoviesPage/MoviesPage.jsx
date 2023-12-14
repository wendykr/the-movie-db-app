import React, { useEffect, useState, useCallback } from 'react';
import './MoviesPage.scss';
import { Movie } from '../../components/Movie/Movie';
import { useSearch } from '../../context/SearchContext';

const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const MoviesPage = () => {
  const { setCountMovies, setHandleSearchChange } = useSearch();
  const [initialMovieList, setInitialMovieList] = useState([]);
  const [filteredMovieList, setFilteredMovieList] = useState([]);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const handleSearchChange = useCallback((event) => {
    const filteredMovies = initialMovieList.filter((oneMovie) =>
      oneMovie.title.toLowerCase().includes(event.toLowerCase())
    );

    setFilteredMovieList(filteredMovies);
    console.log('filteredMovies.length', filteredMovies.length);
    setCountMovies(filteredMovies.length);
  }, [initialMovieList, setCountMovies]);

  useEffect(() => {
    setHandleSearchChange(() => handleSearchChange);
  }, [handleSearchChange]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`);
        const data = await response.json();
        setInitialMovieList(data.results);
        setFilteredMovieList(data.results);
        console.log(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [apiKey]);

  const handleMovieClick = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  };

  const shuffledFilteredMovieList = shuffleArray(filteredMovieList);
  setCountMovies(shuffledFilteredMovieList.length);

  return (
    <div className="page moviesPage">
      <div className="moviesPage__body">
        {
          initialMovieList.length > 0 ? (
            shuffledFilteredMovieList.length === 0 ? (
              <p>Žádné filmy nenalezeny.</p>
            ) : (
              shuffledFilteredMovieList.map((oneMovie, index) => (
                <Movie oneMovie={oneMovie} key={index} handleMovieClick={handleMovieClick} />
              ))
            )
          ) : (
            <p>Načítám data...</p>
          )
        }
      </div>
    </div>
  );
};