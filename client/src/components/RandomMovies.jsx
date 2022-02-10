import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function RandomMovies({ options }) {
  const [randomMovies, setRandomMovies] = useState('');

  const handleClick = () => {
    const randomNumber = Math.floor(Math.random() * 10);

    options.params = { type: 'get-random-movies', page: randomNumber };

    axios.request(options)
      .then((response) => setRandomMovies(response.data.movie_results))
      .catch((error) => console.error(error));
  };

  const renderDirectors = (directors) => {
    return directors !== null
      ? directors.map((director, index) => <span key={index}>{director} / </span>)
      : null;
  };

  const renderRandomCards = (movies) => {
    console.log(movies);
    return (
      movies
        ? movies.map((movieData, index) => (
          <div key={index} className="movieCard">
            <a target="_blank" href={`https://www.imdb.com/title/${movieData.imdb_id}/`} rel="noreferrer">
              <div>Title: {movieData.title}</div>
              <div>Year: {movieData.year}</div>
              <div>Score: {movieData.imdb_rating}</div>
              <div>Directors: {renderDirectors(movieData.directors)}</div>
              {
            movieData.rated !== null
              ? <div>Rating: {movieData.rated}</div>
              : <div>Rating: Not rated</div>
            }
            </a>
          </div>
        ))
        : null
    );
  };
  return (
    <div className="randomMoviesContainer">
      <button type="button" onClick={handleClick}>Random Movies/Shows</button>
      <div className="results">Your random movies/shows: </div>
      <div>{randomMovies.length} results found.</div>
      {renderRandomCards(randomMovies)}
    </div>
  );
}

RandomMovies.propTypes = {
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

export default RandomMovies;
