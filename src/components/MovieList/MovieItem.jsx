import { memo } from 'react';
import PropTypes from 'prop-types';

const NoImageAvailable = memo(() => (
  <div className='flex items-center justify-center w-full h-full bg-gradient-to-br from-primary-light to-primary aspect-[2/3]'>
    <div className='text-center p-4'>
      <svg
        className='mx-auto h-16 w-16 text-primary-dark'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        aria-hidden='true'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
        />
      </svg>
      <p className='mt-2 text-sm font-medium text-primary-dark'>No Image Available</p>
    </div>
  </div>
));

const MovieItem = memo(({ movie, onMovieSelect, isFavorite, handleFavoriteClick }) => (
  <li className='bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 flex flex-col h-full'>
    <div
      onClick={() => onMovieSelect(movie)}
      className='w-full h-full text-left focus:outline-none focus:ring-2 focus:ring-primary flex flex-col cursor-pointer'
    >
      <div className='relative w-full h-64 flex-shrink-0'>
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} poster`}
            className='w-full h-full object-cover'
            loading='lazy'
          />
        ) : (
          <NoImageAvailable />
        )}
        <div className='absolute top-2 right-2 bg-primary-dark bg-opacity-70 text-white px-2 py-1 rounded-full text-xs'>
          ⭐ {movie.vote_average.toFixed(1)}
        </div>
      </div>
      <div className='p-4 flex-grow flex flex-col'>
        <h2 className='text-xl font-bold mb-2 text-primary-dark line-clamp-2 h-14'>
          {movie.title}
        </h2>
        <p className='text-sm text-primary mb-2'>
          {new Date(movie.release_date).getFullYear()} | {movie.original_language.toUpperCase()}
        </p>
        <p className='text-sm text-primary-dark mb-4 line-clamp-3 flex-grow'>{movie.overview}</p>
        <div className='flex justify-between items-center mt-auto'>
          <div
            onClick={(e) => handleFavoriteClick(e, movie)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer ${
              isFavorite(movie.id)
                ? 'bg-primary-dark text-white hover:bg-primary'
                : 'bg-primary text-white hover:bg-primary-dark'
            }`}
            aria-label={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite(movie.id) ? '❤️ Remove' : '🤍 Favorite'}
          </div>
          <span className='text-sm text-primary'>{movie.vote_count} votes</span>
        </div>
      </div>
    </div>
  </li>
));

MovieItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
    overview: PropTypes.string,
    original_language: PropTypes.string,
  }).isRequired,
  onMovieSelect: PropTypes.func.isRequired,
  isFavorite: PropTypes.func.isRequired,
  handleFavoriteClick: PropTypes.func.isRequired,
};

export default MovieItem;
