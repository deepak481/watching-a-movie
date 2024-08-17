import React, { useCallback, useState } from 'react';
import Layout from './components/Layout';
import MovieList from './components/MovieList/MovieList';
import SearchBar from './components/Filters/SearchBar';
import FilterOptions from './components/Filters/FilterOptions';
import InfiniteScroll from './components/InfiniteScroll';
import MovieDetails from './components/MovieList/MovieDetails';
import FavoritesPage from './components/MovieList/FavoritesPage';
import useMovies from './hooks/useMovies';

function App() {
  const { movies, loading, error, fetchMovies, applyFilters, loadMore, hasMore } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const handleSearch = useCallback(
    (query) => {
      fetchMovies(query, 1, true);
      setShowFavorites(false);
    },
    [fetchMovies]
  );

  const handleFilter = useCallback(
    (filters) => {
      applyFilters(filters);
      setShowFavorites(false);
    },
    [applyFilters]
  );

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <Layout>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-primary-light'>
        <div className='flex flex-col md:flex-row justify-between items-center mb-12'>
          <h1 className='text-5xl font-extrabold text-primary-dark mb-6 md:mb-0 text-center'>
            {showFavorites ? 'My Favorites' : 'Movie Explorer'}
          </h1>
          <button
            onClick={toggleFavorites}
            className='px-8 py-3 bg-primary text-white font-semibold rounded-full 
                       hover:bg-primary-dark focus:outline-none focus:ring-2 
                       focus:ring-primary focus:ring-offset-2 transition-all 
                       duration-300 ease-in-out shadow-md transform hover:scale-105'
          >
            {showFavorites ? 'Show All Movies' : 'Show Favorites'}
          </button>
        </div>

        {!showFavorites && (
          <div className='mb-12 space-y-6'>
            <SearchBar onSearch={handleSearch} />
            <FilterOptions onFilter={handleFilter} />
          </div>
        )}

        {error && (
          <div
            role='alert'
            className='bg-red-600 border-l-4 border-primary-dark text-white p-6 mb-12 rounded-lg shadow-md'
          >
            <p className='font-bold text-lg mb-2'>Error</p>
            <p>{error}</p>
          </div>
        )}

        <div className='bg-white shadow-2xl rounded-xl overflow-hidden border-2 border-primary'>
          {showFavorites ? (
            <FavoritesPage onMovieSelect={handleMovieSelect} />
          ) : (
            <>
              <MovieList movies={movies} onMovieSelect={handleMovieSelect} />
              <InfiniteScroll onLoadMore={loadMore} hasMore={hasMore} loading={loading} />
            </>
          )}
        </div>
      </div>

      <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
    </Layout>
  );
}

export default App;
