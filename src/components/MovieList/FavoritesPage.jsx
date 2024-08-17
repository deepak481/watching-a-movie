import React from 'react';
import PropTypes from 'prop-types';
import MovieList from './MovieList';
import useFavorites from '../../hooks/useFavorites';

const FavoritesPage = ({ onMovieSelect }) => {
  const { favorites } = useFavorites();

  return (
    <div className='container mx-auto px-4 py-8'>
      {favorites.length === 0 ? (
        <div className='flex flex-col items-center justify-center min-h-[50vh] text-center'>
          <svg
            className='w-24 h-24 text-primary mb-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
            />
          </svg>
          <h2 className='text-3xl font-bold text-primary-dark mb-4'>No Favorites Yet</h2>
          <p className='text-xl text-gray-600 mb-8'>
            Start exploring movies and add some to your favorites!
          </p>
          <button
            onClick={() => window.history.back()}
            className='bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50'
          >
            Discover Movies
          </button>
        </div>
      ) : (
        <>
          <h1 className='text-4xl font-bold text-primary-dark mb-8 text-center'>
            Your Favorite Movies
          </h1>
          <MovieList movies={favorites} onMovieSelect={onMovieSelect} />
        </>
      )}
    </div>
  );
};

FavoritesPage.propTypes = {
  onMovieSelect: PropTypes.func.isRequired,
};

export default FavoritesPage;
