/* eslint-disable react/jsx-boolean-value */
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import renderCards from './utils';

const MoviesSearch = ({ options }) => {
  const [movie, setMovie] = useState('');
  const [moviesData, setMoviesData] = useState('');

  const handleChange = (e) => {
    const movieInput = e.target.value;

    setMovie(movieInput);
    options.params = { type: 'get-movies-by-title', title: movieInput };

    axios.request(options)
      .then((response) => setMoviesData(response.data.movie_results))
      .catch((error) => console.error(error));
  };

  return (
    <div className="moviesContainer">
      <input name="movieTitle" placeholder="Enter movie title here" onChange={handleChange} />
      <div className="results">{moviesData.length} results found.</div>
      <div>Movies/Shows for: {movie}</div>
      {renderCards(moviesData)}
    </div>
  );
};

MoviesSearch.propTypes = {
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

export default MoviesSearch;
