import axios from 'axios';

const API_KEY = 'e41ff3872b0e0498b31bb45277e647c8';
const BASE_URL = 'https://api.themoviedb.org/3/';

const movieService = {
  fetchTrendingMovies: async () => {
    const response = await axios.get(`${BASE_URL}trending/movie/day`, {
      params: { api_key: API_KEY },
    });
    return response.data.results;
  },

  searchMovies: async (query) => {
    const response = await axios.get(`${BASE_URL}search/movie`, {
      params: { query, api_key: API_KEY, language: 'en-US' },
    });
    return response.data.results;
  },

  fetchMovieDetails: async (movieId) => {
    const response = await axios.get(`${BASE_URL}movie/${movieId}`, {
      params: { api_key: API_KEY },
    });
    return response.data;
  },

  fetchMovieCast: async (movieId) => {
    const response = await axios.get(`${BASE_URL}movie/${movieId}/credits`, {
      params: { api_key: API_KEY },
    });
    return response.data.cast;
  },

  fetchMovieReviews: async (movieId) => {
    const response = await axios.get(`${BASE_URL}movie/${movieId}/reviews`, {
      params: { api_key: API_KEY },
    });
    return response.data.results;
  },
};

export default movieService;