import React, { useEffect, useState } from 'react';
import './MovieDetail.scss';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { MovieSimilar } from '../MovieSimilar/MovieSimilar';
import { MovieVideo } from '../MovieVideo/MovieVideo';
import Flag from 'react-flagkit';

export const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [casts, setCasts] = useState([]);
  const [showAllCasts, setShowAllCasts] = useState(false);
  const [videos, setVideos] = useState([]);
  const { movieId } = useParams();
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const isLocalhost = window.location.href.startsWith('http://localhost') || window.location.href.startsWith('http://127.0.0.1');

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!movieId) {
        console.error("Invalid id:", movieId);
        return;
      }

      const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
      const movieData = await movieResponse.json();
      setMovie(movieData);
      setGenres(movieData.genres);

      const castsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/casts?api_key=${apiKey}`);
      const castsData = await castsResponse.json();
      setCasts(castsData.cast);
      console.log('castsData', castsData.cast);

      const recommendationsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}`);
      const recommendationsData = await recommendationsResponse.json();
      setSimilarMovies(recommendationsData.results);

      const videosResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
      const videosData = await videosResponse.json();
      const videos = videosData.results;
      setVideos(videos.slice(0, 1));
      console.log(movieData);
    };

    fetchMovieDetail();
  }, [apiKey, movieId]);

  const handleSimilarMovieClick = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  };

  const handleClick = () => {
    setShowAllCasts(!showAllCasts);
  };

  const releaseYear = movie ? new Date(movie.release_date).getFullYear() : null;
  const productionCountries = movie ? movie.production_countries.map((country) => country.name).join(', ') : null;
  const displayedCasts = showAllCasts ? casts : casts.slice(0, 5);

  return (
    <div className="page movieDetail">
      {
        movie ? (
          <div className="container movieDetail__container">
            <div className="movieDetail__body">
              <img
                className="movieDetail__image"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={`Poster for ${movie.title}`}
                onError={(e) => {
                  e.target.src = isLocalhost ? '/public/images/no-image-available.jpg' : '/images/no-image-available.jpg';
                }}
              />
              <div className="movieDetail__text">
                <h1 className="movieDetail__title">{movie.title}</h1>
                <h2 className="movieDetail__title--original">
                  {/* [{movie.original_language.toUpperCase()}]  */}
                  {
                    movie.original_language === 'en' ? (
                      <Flag className="movieDetail__flag" country="GB" />
                    ) : movie.original_language === 'ja' ? (
                      <Flag className="movieDetail__flag" country="JP" />
                    ) : movie.original_language === 'zh' ? (
                      <Flag className="movieDetail__flag" country="CN" />
                    ) : movie.original_language === 'ko' ? (
                      <Flag className="movieDetail__flag" country="TH" />
                    ) : movie.original_language === 'te' ? (
                      <Flag className="movieDetail__flag" country="IN" />
                    ) : (
                      <Flag className="movieDetail__flag" country={movie.original_language.toUpperCase()} />
                    )
                  }
                  {movie.original_title}
                </h2>
                <ul className="movieDetail__categories">
                {
                  genres.map((genre) => (
                    <li key={genre.id} className="movieDetail__categories--item">
                      <Link className="movieDetail__categories--link" to={`/genre/${genre.id}`}>{genre.name}</Link>
                    </li>
                  ))
                }
                </ul>
                <p className="movieDetail__info"><span className="movieDetail__country">{productionCountries}</span> | <span className="movieDetail__year">{releaseYear}</span> | <span className="movieDetail__runtime">{`${movie.runtime} min`}</span></p>
                <p className="movieDetail__overview">{movie.overview}</p>
                {displayedCasts.length > 0 && (
                  <p className="movieDetail__cast">Hrají: {" "}
                    {
                      displayedCasts.map((cast, index) => (
                        <Link className="movieDetail__cast--list" key={cast.id} to={`/person/${cast.id}`}>
                          <span className="movieDetail__cast--item">{cast.name}</span>{index < displayedCasts.length - 1 && ","}{" "}
                        </Link>
                      ))
                    }
                    {
                      casts.length > 5 && (
                        <span className="movieDetail__cast--more" onClick={handleClick}>
                          { showAllCasts ? "Skrýt" : "Zobrazit\u00A0více" }
                        </span>
                      )
                    }
                  </p>
                )}
              </div>
            </div>

            {videos.length > 0 && (
              <div>
                <h3 className="movieDetail__subtitle">Trailer</h3>
                <div className="videoContainer">
                  {videos.map((video, index) => (
                    <MovieVideo key={index} video={video} />
                  ))}
                </div>
              </div>
            )}

            {similarMovies.length > 0 && (
              <div>
                <h3 className="movieDetail__subtitle">Podobné filmy</h3>
                <div className="similarMovie">
                  {similarMovies.map((similarMovie, index) => (
                    <MovieSimilar
                      key={index}
                      similarMovie={similarMovie}
                      handleSimilarMovieClick={handleSimilarMovieClick}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="movieDetail__message">Načítám data...</div>
        )
      }
    </div>
  );
};