import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import movieService from '../components/services/movieService';
import MovieCast from '../components/MovieCast/MovieCast';
import MovieReviews from '../components/MovieReviews/MovieReviews';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await movieService.fetchMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <Link to="/movies">Go back</Link>

      {}
      <MovieCast movieId={movieId} />
      <MovieReviews movieId={movieId} />
    </div>
  );
};

export default MovieDetailsPage;