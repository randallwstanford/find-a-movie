/* eslint-disable no-console */
import React from 'react';
import { apiKey } from '../../../api-key';

// Components
import Movies from './Movies';
import MoviesSearch from './MoviesSearch';

const Form = () => {
  const options = {
    method: 'GET',
    url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
    headers: { 'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com', 'x-rapidapi-key': apiKey },
  };

  return (
    <div className="form">
      <MoviesSearch options={options} />
      <Movies options={options} />
    </div>
  );
};

export default Form;
