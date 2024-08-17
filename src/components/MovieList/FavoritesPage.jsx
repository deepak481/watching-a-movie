import React from 'react';
import MovieList from './MovieList';
import useFavorites from '../../hooks/useFavorites';

const FavoritesPage = ({ onMovieSelect }) => {
  const { favorites } = useFavorites();

  return (
    <div>
      {favorites.length === 0 ? (
        <p>You haven't added any favorites yet.</p>
      ) : (
        <MovieList movies={favorites} onMovieSelect={onMovieSelect} />
      )}
    </div>
  );
};

export default FavoritesPage;
