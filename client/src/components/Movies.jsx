/* eslint-disable react/jsx-boolean-value */
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function Movies({ options }) {
  const [movie, setMovie] = useState('');
  const [moviesData, setMoviesData] = useState('');

  const handleSubmit = (e) => {
    const movieInput = e.target.movieTitle.value;
    e.preventDefault();

    setMovie(movieInput);

    options.params = { type: 'get-movies-by-title', title: movieInput };

    axios.request(options)
      .then((response) => setMoviesData(response.data.movie_results))
      .catch((error) => console.error(error));

    e.target.movieTitle.value = '';
  };

  const renderCards = (movies) => {
    return (
      movies
        ? movies.map((movieData, index) => (
          <div key={index} className="movieCard">
            <a target="_blank" href={`https://www.imdb.com/title/${movieData.imdb_id}/`} rel="noreferrer">
              <div>Title: {movieData.title}</div>
              <div>Year: {movieData.year}</div>
              <div>IMDB imdb: {movieData.imdb_id}</div>
            </a>
          </div>
        ))
        : null
    );
  };

  return (
    <div className="moviesContainer">
      <form onSubmit={handleSubmit}>
        <input name="movieTitle" placeholder="Enter movie title here" />
        <button type="submit">Search Movie/Show</button>
      </form>
      <div className="results">Movies/Shows for: {movie}</div>
      <div>{moviesData.length} results found.</div>
      {renderCards(moviesData)}
    </div>
  );
}

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
