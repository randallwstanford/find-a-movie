/* eslint-disable no-console */
import React, { useState } from 'react';
import axios from 'axios';
import { apiKey } from '../../../api-key';

function Form() {
  const [movie, setMovie] = useState('');
  const [moviesData, setMoviesData] = useState('');
  const [randomMovies, setRandomMovies] = useState('');

  const options = {
    method: 'GET',
    url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
    headers: { 'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com', 'x-rapidapi-key': apiKey },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const movieInput = e.target.movieTitle.value;
    options.params = { type: 'get-movies-by-title', title: movieInput };

    setMovie(movieInput);

    axios.request(options)
      .then((response) => setMoviesData(response.data.movie_results))
      .catch((error) => console.error(error));

    e.target.movieTitle.value = '';
  };

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
    return (
      movies
        ? movies.map((movieData, index) => (
          <div key={index} className="movieCard">
            <div>Title: {movieData.title}</div>
            <div>Year: {movieData.year}</div>
            <div>Score: {movieData.imdb_rating}</div>
            <div>Directors: {renderDirectors(movieData.directors)}</div>
            {(movieData.rated !== null || movieData.rated !== 'NOT RATED' || movieData.rated !== 'N/A')
              ? <div>Rating: {movieData.rated}</div>
              : <div>Rating: Not rated</div>}
          </div>
        ))
        : null
    );
  };

  const renderCards = (movies) => {
    return (
      movies
        ? movies.map((movieData, index) => (
          <div key={index} className="movieCard">
            <div>Title: {movieData.title}</div>
            <div>Year: {movieData.year}</div>
            <div>IMDB imdb: {movieData.imdb_id}</div>
          </div>
        ))
        : null
    );
  };

  return (
    <div className="form">
      <div className="movies">
        <form onSubmit={handleSubmit}>
          <input name="movieTitle" placeholder="Enter movie title here" />
          <button type="submit">Search Movie/Show</button>
        </form>
        <div>Movies/Shows for: {movie}</div>
        <div>{moviesData.length} results found.</div>
        {renderCards(moviesData)}
      </div>
      <div className="randomMovies">
        <button type="button" onClick={handleClick}>Random Movies/Shows</button>
        <div>Your random movies/shows: </div>
        <div>{randomMovies.length} results found.</div>
        {renderRandomCards(randomMovies)}
      </div>
    </div>
  );
}

export default Form;
