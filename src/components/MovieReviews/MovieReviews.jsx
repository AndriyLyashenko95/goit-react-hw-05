import React, { useState, useEffect } from 'react';
import movieService from '../services/movieService';

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await movieService.fetchMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (error) {
        setError('Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  const toggleReviews = () => {
    setShowReviews(prevState => !prevState);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <button onClick={toggleReviews}>
        {showReviews ? 'Hide Reviews' : 'Show Reviews'}
      </button>

      {showReviews && (
        <div>
          <h4>Reviews</h4>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map(review => (
                <li key={review.id}>
                  <p>{review.content}</p>
                  <p>
                    <strong>{review.author}</strong>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieReviews;