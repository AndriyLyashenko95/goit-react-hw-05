import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => (
  <ul>
    {movies.map(movie => (
      <li key={movie.id}>
        <Link to={`/movies/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
        </Link>
      </li>
    ))}
  </ul>
);

export default MovieList;