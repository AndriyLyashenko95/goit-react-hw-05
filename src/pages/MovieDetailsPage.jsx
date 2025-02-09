import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import MovieCast from '../components/MovieCast';  // Компонент для відображення акторів
import MovieReviews from '../components/MovieReviews';  // Компонент для відображення оглядів
import movieService from '../services/movieService';  // Ваш сервіс для отримання даних

const MovieDetailsPage = () => {
  const { movieId } = useParams();  // Отримуємо ID фільму з параметрів маршруту
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('cast');  // За замовчуванням активна вкладка - Cast

  // Завантажуємо дані про фільм, акторів та огляди
  useEffect(() => {
    movieService.fetchMovieDetails(movieId).then(setMovie);
    movieService.fetchMovieCast(movieId).then(setCast);
    movieService.fetchMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  // Функція для повернення на попередню сторінку
  const goBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate('/movies');
    }
  };

  // Функція для зміни активної вкладки
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={goBack}>Go Back</button>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>

      {/* Вкладки для вибору між Cast та Reviews */}
      <div>
        <button onClick={() => handleTabChange('cast')} style={{ fontWeight: activeTab === 'cast' ? 'bold' : 'normal' }}>
          Cast
        </button>
        <button onClick={() => handleTabChange('reviews')} style={{ fontWeight: activeTab === 'reviews' ? 'bold' : 'normal' }}>
          Reviews
        </button>
      </div>

      {/* Рендеримо активну вкладку */}
      {activeTab === 'cast' && <MovieCast movieId={movieId} cast={cast} />}  {/* Передаємо movieId */}
      {activeTab === 'reviews' && <MovieReviews reviews={reviews} />}
    </div>
  );
};

export default MovieDetailsPage;