import { API_KEY, BASE_URL } from '../utils/constant';

export const searchMovies = async (query, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
};

export const getPopularMovies = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  return response.json();
};

export const getGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch genres');
  }
  return response.json();
};

export const getMoviesWithFilters = async (filters, page = 1) => {
  const { genre, yearFrom, yearTo, ratingFrom, ratingTo } = filters;
  let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}`;

  if (genre) url += `&with_genres=${genre}`;
  if (yearFrom) url += `&primary_release_date.gte=${yearFrom}-01-01`;
  if (yearTo) url += `&primary_release_date.lte=${yearTo}-12-31`;
  if (ratingFrom) url += `&vote_average.gte=${ratingFrom}`;
  if (ratingTo) url += `&vote_average.lte=${ratingTo}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch movies with filters');
  }
  return response.json();
};
