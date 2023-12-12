import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { MoviesPage } from './pages/MoviesPage/MoviesPage';
import { MovieDetail } from './components/MovieDetail/MovieDetail';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';

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
        path: '/movie/:id',
        element: <MovieDetail />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)