import React, { useEffect, useState } from 'react';
import movieService from '../components/services/movieService';
import MovieList from '../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieService.fetchTrendingMovies().then(setMovies);
  }, []);

  return (
    <div>
      <h1>Popular Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;