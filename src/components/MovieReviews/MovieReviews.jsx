import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`,
          {
            headers: { Authorization: ' Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDFmZjM4NzJiMGUwNDk4YjMxYmI0NTI3N2U2NDdjOCIsIm5iZiI6MTczOTEzMjAzMi42MTY5OTk5LCJzdWIiOiI2N2E5MGM4MDI0YmJmYzY1MjE5MzYzODciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.XaEWiJHyAKhS6faFYmOJRi-XR_b8LdnmTCO-CfCcWZ8'},
          }
        );
        setReviews(response.data.results);
      } catch (error) {
        setError('Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews available</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h4>{review.author}</h4>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;