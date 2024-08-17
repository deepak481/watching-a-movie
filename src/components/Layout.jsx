import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col bg-primary-light'>
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 
                   bg-primary text-white p-3 z-50 transition duration-300 ease-in-out 
                   hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary'
      >
        Skip to main content
      </a>
      <header className='bg-primary-dark text-white py-8 shadow-lg'>
        <div className='container mx-auto px-6'>
          <h1 className='text-5xl font-extrabold tracking-wide text-center'>Watching a Movie</h1>
        </div>
      </header>
      <main id='main-content' className='flex-grow container mx-auto px-6 py-12'>
        {children}
      </main>
      <footer className='bg-primary-dark text-white py-8'>
        <div className='container mx-auto px-6 text-center'>
          <p className='text-lg'>&copy; 2024 Watching a Movie. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
