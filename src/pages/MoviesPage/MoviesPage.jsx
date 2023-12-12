import React, { useEffect, useState } from 'react';
import './MoviesPage.scss';
import { Search } from '../../components/Search/Search';
import { Movie } from '../../components/Movie/Movie';

const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const MoviesPage = () => {
  const [initialMovieList, setInitialMovieList] = useState([]);
  const [filteredMovieList, setFilteredMovieList] = useState([]);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`);
        const data = await response.json();
        setInitialMovieList(data.results);
        setFilteredMovieList(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [apiKey]);

  const handleSearchChange = (event) => {
    const filteredMovies = initialMovieList.filter((oneMovie) =>
      oneMovie.title.toLowerCase().includes(event.toLowerCase())
    );

    setFilteredMovieList(filteredMovies);
  };

  const handleMovieClick = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  };

  const shuffledFilteredMovieList = shuffleArray(filteredMovieList);

  return (
    <div className="moviesPage">
      <Search countMovie={shuffledFilteredMovieList.length} onSearchChange={handleSearchChange} />
      <div className="moviesPage__body">
        {
          initialMovieList.length > 0 ? (
            shuffledFilteredMovieList.length === 0 ? (
              <p>No movies found.</p>
            ) : (
              shuffledFilteredMovieList.map((oneMovie, index) => (
                <Movie oneMovie={oneMovie} key={index} handleMovieClick={handleMovieClick} />
              ))
            )
          ) : (
            <p>Loading data...</p>
          )
        }
      </div>
    </div>
  );
};