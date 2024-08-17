import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import debounce from '../../utils/debounce';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = useCallback(
    debounce((q) => {
      onSearch(q);
    }, 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className='mb-8 px-4 sm:px-0'>
      <label htmlFor='search-input' className='sr-only'>
        Search for movies
      </label>
      <input
        id='search-input'
        type='text'
        value={query}
        onChange={handleInputChange}
        placeholder='Search for movies...'
        className='w-full px-6 py-4 bg-primary-light text-primary-dark placeholder-primary-dark/70 border-2 border-primary focus:outline-none focus:ring-2 focus:ring-primary-light transition duration-300 ease-in-out rounded-lg'
        aria-label='Search for movies'
      />
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
