import { useState, useEffect, useCallback } from 'react';
import { searchMovies, getPopularMovies, getMoviesWithFilters } from '../services/api';

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMovies = useCallback(
    async (query = '', newPage = 1, newSearch = false) => {
      if (!hasMore && !newSearch) return;

      setLoading(true);
      setError(null);
      try {
        let data;
        if (query) {
          data = await searchMovies(query, newPage);
        } else if (Object.keys(filters).length > 0) {
          data = await getMoviesWithFilters(filters, newPage);
        } else {
          data = await getPopularMovies(newPage);
        }

        if (newSearch || newPage === 1) {
          setMovies(data.results);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        }
        setPage(newPage);
        setHasMore(data.page < data.total_pages);
        setSearchQuery(query);
      } catch (err) {
        setError('Failed to fetch movies. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [hasMore, filters]
  );

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    setHasMore(true);
    fetchMovies('', 1, true);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchMovies(searchQuery, page + 1);
    }
  };

  return { movies, loading, error, fetchMovies, applyFilters, loadMore, hasMore };
};

export default useMovies;
