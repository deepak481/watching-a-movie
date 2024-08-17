import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { getGenres } from '../../services/api';
import debounce from '../../utils/debounce';

const FilterOptions = ({ onFilter }) => {
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    yearFrom: '',
    yearTo: '',
    ratingFrom: '',
    ratingTo: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await getGenres();
        setGenres(genreList.genres);
      } catch (error) {
        console.error('Failed to fetch genres:', error);
        setError('Failed to load genres. Please try again later.');
      }
    };
    fetchGenres();
  }, []);

  const debouncedFilter = useCallback(
    debounce((newFilters) => {
      onFilter({
        genre: newFilters.genre,
        yearFrom: newFilters.yearFrom || undefined,
        yearTo: newFilters.yearTo || undefined,
        ratingFrom: newFilters.ratingFrom || undefined,
        ratingTo: newFilters.ratingTo || undefined,
      });
    }, 300),
    [onFilter]
  );

  useEffect(() => {
    debouncedFilter(filters);
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const inputClasses = useMemo(
    () => `
    w-full px-4 py-3 rounded-lg border border-primary
    bg-white text-primary-dark placeholder-primary-light
    focus:outline-none focus:ring-2 focus:ring-primary
    transition duration-300 ease-in-out
  `,
    []
  );

  const memoizedGenres = useMemo(() => genres, [genres]);

  return (
    <div className='mb-8 space-y-6 bg-primary-light p-8 rounded-xl shadow-lg'>
      {error && (
        <div role='alert' className='text-red-600 mb-4'>
          {error}
        </div>
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div>
          <label htmlFor='genre' className='block text-primary-dark font-medium mb-2'>
            Genre
          </label>
          <select
            id='genre'
            name='genre'
            value={filters.genre}
            onChange={handleInputChange}
            className={inputClasses}
            aria-label='Select movie genre'
          >
            <option value=''>All Genres</option>
            {memoizedGenres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='yearFrom' className='block text-primary-dark font-medium mb-2'>
            Year Range
          </label>
          <div className='flex space-x-4'>
            <input
              type='number'
              id='yearFrom'
              name='yearFrom'
              value={filters.yearFrom}
              onChange={handleInputChange}
              placeholder='From'
              className={inputClasses}
              aria-label='Year from'
            />
            <input
              type='number'
              id='yearTo'
              name='yearTo'
              value={filters.yearTo}
              onChange={handleInputChange}
              placeholder='To'
              className={inputClasses}
              aria-label='Year to'
            />
          </div>
        </div>
        <div>
          <label htmlFor='ratingFrom' className='block text-primary-dark font-medium mb-2'>
            Rating Range
          </label>
          <div className='flex space-x-4'>
            <input
              type='number'
              id='ratingFrom'
              name='ratingFrom'
              value={filters.ratingFrom}
              onChange={handleInputChange}
              placeholder='From'
              min='0'
              max='10'
              step='0.1'
              className={inputClasses}
              aria-label='Rating from'
            />
            <input
              type='number'
              id='ratingTo'
              name='ratingTo'
              value={filters.ratingTo}
              onChange={handleInputChange}
              placeholder='To'
              min='0'
              max='10'
              step='0.1'
              className={inputClasses}
              aria-label='Rating to'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

FilterOptions.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default FilterOptions;
