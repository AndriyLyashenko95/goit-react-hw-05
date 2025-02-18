import React, { useState, useEffect } from 'react';
import movieService from '../services/movieService';

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCast, setShowCast] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const castData = await movieService.fetchMovieCast(movieId);
        setCast(castData);
      } catch (error) {
        setError('Failed to fetch cast data');
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  const toggleCast = () => {
    setShowCast(prevState => !prevState);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <button onClick={toggleCast}>
        {showCast ? 'Hide Cast' : 'Show Cast'}
      </button>

      {showCast && (
        <div>
          <h3>Cast</h3>
          <ul>
            {cast.map((actor) => (
              <li key={actor.id}>
                {actor.profile_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                    style={{ width: '100px', height: '150px', objectFit: 'cover' }}
                  />
                )}
                <h4>{actor.name}</h4>
                <p>{actor.character}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieCast;