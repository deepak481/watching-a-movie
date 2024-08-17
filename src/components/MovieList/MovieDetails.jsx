import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

const MovieDetails = ({ movie, onClose }) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!movie) return null;

  return (
    <div className='fixed inset-0 bg-primary-dark bg-opacity-90 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
      <div className='bg-primary-light rounded-xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto'>
        <h2 className='text-3xl font-bold mb-6 text-center text-primary-dark'>{movie.title}</h2>
        <div className='relative mb-6 rounded-lg overflow-hidden shadow-lg'>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} poster`}
            className='w-full h-auto'
          />
          <div className='absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-lg'>
            {movie.vote_average.toFixed(1)}/10
          </div>
        </div>
        <div className='space-y-4 mb-6'>
          <p className='text-primary-dark'>
            <span className='font-semibold'>Release Date:</span> {movie.release_date}
          </p>
          <p className='text-primary-dark line-clamp-4'>{movie.overview}</p>
        </div>
        <button
          onClick={onClose}
          className='w-full py-3 bg-primary text-white rounded-full text-lg font-medium 
                     hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary 
                     focus:ring-offset-2 transition-all duration-300 ease-in-out 
                     transform hover:scale-105'
        >
          Close
        </button>
      </div>
    </div>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    vote_average: PropTypes.number,
  }),
  onClose: PropTypes.func.isRequired,
};

export default MovieDetails;
