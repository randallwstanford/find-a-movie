/* eslint-disable no-console */
import React from 'react';
import { apiKey } from '../../../api-key';

// Components
import RandomMovies from './RandomMovies';
import Movies from './Movies';

function Form() {
  const options = {
    method: 'GET',
    url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
    headers: { 'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com', 'x-rapidapi-key': apiKey },
  };

  return (
    <div className="form">
      <Movies options={options} />
      <RandomMovies options={options} />
    </div>
  );
}

export default Form;
