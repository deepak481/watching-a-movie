import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const InfiniteScroll = ({ onLoadMore, hasMore, loading }) => {
  const loadingRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        onLoadMore();
      }
    }, options);

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [hasMore, loading, onLoadMore]);

  return (
    <div ref={loadingRef} className='py-8'>
      {loading && (
        <div className='flex justify-center items-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
          <span className='ml-3 text-lg text-primary-dark'>Loading more movies...</span>
        </div>
      )}
      {!hasMore && (
        <div className='text-center'>
          <svg
            className='mx-auto h-12 w-12 text-primary'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
            />
          </svg>
          <p className='mt-2 text-xl font-semibold text-primary-dark'>You've reached the end!</p>
          <p className='text-primary'>No more movies to load</p>
        </div>
      )}
    </div>
  );
};

InfiniteScroll.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default InfiniteScroll;
