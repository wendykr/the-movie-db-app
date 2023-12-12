import React, { useEffect, useState } from 'react';
import './MovieDetail.scss';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { MovieSimilar } from '../MovieSimilar/MovieSimilar';
import { MovieVideo } from '../MovieVideo/MovieVideo';

export const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  console.log(id);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!id) {
        console.error("Invalid id:", id);
        return;
      }

      const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
      const movieData = await movieResponse.json();

      const recommendationsResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`);
      const recommendationsData = await recommendationsResponse.json();

      const videosResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`);
      const videosData = await videosResponse.json();
      const videos = videosData.results;

      setMovie(movieData);
      console.log(movieData);
      setGenres(movieData.genres);
      setSimilarMovies(recommendationsData.results);
      setVideos(videos.slice(0, 1));
    };

    fetchMovieDetail();
  }, [apiKey, id]);

  const handleSimilarMovieClick = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  };

  const releaseYear = movie ? new Date(movie.release_date).getFullYear() : null;
  const productionCountries = movie ? movie.production_countries.map((country) => country.name).join(', ') : null;

  return (
    <div className="movieDetail">
      {
        movie ? (
          <div className="movieDetail__container">
            <Link className="movieDetail__link" to="/"> Back to list </Link>
            <div className="movieDetail__body">
              <img
                className="movieDetail__image"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={`Poster for ${movie.title}`}
                onError={(e) => {
                  e.target.src = '/public/images/no-image-available.jpg';
                }}
              />
              <div className="movieDetail__text">
                <h1 className="movieDetail__title">{movie.title}</h1>
                <h2 className="movieDetail__title--original">[{movie.original_language.toUpperCase()}] {movie.original_title}</h2>
                <ul className="movieDetail__categories">
                  {genres.map((genre) => (
                    <li key={genre.id} className="movieDetail__categories--item">{genre.name}</li>
                  ))}
                </ul>
                <p><span className="movieDetail__country">{productionCountries}</span> / <span className="movieDetail__year">{releaseYear}</span> / <span className="movieDetail__runtime">{`${movie.runtime} min`}</span></p>
                <p className="movieDetail__overview">{movie.overview}</p>
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
                <h3 className="movieDetail__subtitle">Similar Movies</h3>
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

            <Link className="movieDetail__link" to="/"> Back to list </Link>
          </div>
        ) : (
          <div className="movieDetail__message">Loading data...</div>
        )
      }
    </div>
  );
};