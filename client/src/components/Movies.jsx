import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import renderCards from './utils';

const Movies = ({ options }) => {
  const [movies, setMovies] = useState('');

  const handleRandom = () => {
    const randomNumber = Math.floor(Math.random() * 10);
    options.params = { type: 'get-random-movies', page: randomNumber };

    axios.request(options)
      .then((response) => setMovies(response.data.movie_results))
      .catch((error) => console.error(error));
  };

  const handlePopular = () => {
    const currentYear = new Date().getFullYear();
    options.params = { type: 'get-popular-movies', page: '1', year: currentYear };

    axios.request(options)
      .then((response) => setMovies(response.data.movie_results))
      .catch((error) => console.error(error));
  };

  return (
    <div className="randomMoviesContainer">
      <button type="button" onClick={handleRandom}>Random Movies</button>
      <button type="button" onClick={handlePopular}>Popular Movies</button>
      <div className="results">{movies.length} results found.</div>
      <div>Results: </div>
      {renderCards(movies)}
    </div>
  );
};

Movies.propTypes = {
  options: PropTypes.shape({
    method: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.shape({
      type: PropTypes.string,
      page: PropTypes.string,
    }),
    headers: PropTypes.shape({
      'x-rapidapi-host': PropTypes.string,
      'x-rapidapi-key': PropTypes.string,
    }),
  }).isRequired,
};

export default Movies;
