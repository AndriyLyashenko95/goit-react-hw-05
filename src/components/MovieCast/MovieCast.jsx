import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          {
            headers: { Authorization: ' Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDFmZjM4NzJiMGUwNDk4YjMxYmI0NTI3N2U2NDdjOCIsIm5iZiI6MTczOTEzMjAzMi42MTY5OTk5LCJzdWIiOiI2N2E5MGM4MDI0YmJmYzY1MjE5MzYzODciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.XaEWiJHyAKhS6faFYmOJRi-XR_b8LdnmTCO-CfCcWZ8'},
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        setError('Failed to fetch cast data');
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
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
  );
};

export default MovieCast;