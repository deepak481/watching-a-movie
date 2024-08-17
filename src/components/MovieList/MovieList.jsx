import React, { memo } from 'react';
import PropTypes from 'prop-types';
import useFavorites from '../../hooks/useFavorites';
import MovieItem from './MovieItem';

const MovieList = ({ movies, onMovieSelect }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleFavoriteClick = (e, movie) => {
    e.stopPropagation();
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6'>
      {movies.map((movie) => (
        <MovieItem
          key={`${movie.id}-${movie.title}`}
          movie={movie}
          onMovieSelect={onMovieSelect}
          isFavorite={isFavorite}
          handleFavoriteClick={handleFavoriteClick}
        />
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      release_date: PropTypes.string,
      vote_average: PropTypes.number,
      vote_count: PropTypes.number,
      overview: PropTypes.string,
      original_language: PropTypes.string,
    })
  ).isRequired,
  onMovieSelect: PropTypes.func.isRequired,
};

export default MovieList;
