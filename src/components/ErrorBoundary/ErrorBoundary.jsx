// import React from 'react';
// import PropTypes from 'prop-types';

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error('Error caught by ErrorBoundary:', error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return <h1>Something went wrong. Please try refreshing the page.</h1>;
//     }

//     return this.props.children;
//   }
// }

// ErrorBoundary.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default ErrorBoundary;

import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-primary-light to-primary-dark'>
          <div className='bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center'>
            <div className='mb-6'>
              <svg
                className='mx-auto h-16 w-16 text-red-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                />
              </svg>
            </div>
            <h1 className='text-3xl font-bold text-primary-dark mb-4'>
              Oops! Something went wrong.
            </h1>
            <p className='text-gray-600 mb-6'>
              We're sorry for the inconvenience. Our team has been notified and is working on a fix.
            </p>
            <button
              onClick={() => window.location.reload()}
              className='bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50'
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
