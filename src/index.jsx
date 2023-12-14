import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.scss';
import { MoviesPage } from './pages/MoviesPage/MoviesPage';
import { MovieDetail } from './components/MovieDetail/MovieDetail';
import { GenrePage } from './pages/GenrePage/GenrePage';
import { PersonPage } from './pages/PersonPage/PersonPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { SearchProvider } from './context/SearchContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <MoviesPage />,
      },
      {
        path: '/movie/:movieId',
        element: <MovieDetail />,
      },
      {
        path: '/genre/:genreId',
        element: <GenrePage />,
      },
      {
        path: '/person/:personId',
        element: <PersonPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <SearchProvider>
    <RouterProvider router={router} />
  </SearchProvider>
)