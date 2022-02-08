import React, { useState } from 'react'
import axios from 'axios'
import { apiKey } from '../../../api-key.js'

const Form = () => {
  const [movie, setMovie] = useState('')
  const [moviesData, setMoviesData] = useState('')
  const [randomMovies, setRandomMovies] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const movieInput = e.target.movieTitle.value
    const options = {

      method: 'GET',
      url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
      params: { type: 'get-movies-by-title', title: movieInput },
      headers: {
        'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
        'x-rapidapi-key': apiKey
      }
    }

    setMovie(movieInput)

    axios.request(options)
      .then((response) => {
        console.log(response.data.movie_results)
        setMoviesData(response.data.movie_results)
      })
      .catch((error) => console.error(error))

    e.target.movieTitle.value = ''
  }

  const handleClick = () => {
    const options = {
      method: 'GET',
      url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
      params: { type: 'get-random-movies', page: '1' },
      headers: {
        'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
        'x-rapidapi-key': 'c961afde0bmsh919ccbd34b5ebb3p13f56ajsnc1d975d8de37'
      }
    }

    axios.request(options)
      .then((response) => {
        console.log(response.data.movie_results)
        setRandomMovies(response.data.movie_results)
      })
      .catch((error) => console.error(error))
  }

  const renderCards = (movies) => {
    return (
      movies
        ? movies.map((movie, index) => (
            <div key={index} className="movieCard">
              <div>Movie Title: {movie.title}</div>
              <div>Movie Year: {movie.year}</div>
            </div>
        ))
        : null
    )
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input name="movieTitle" placeholder="Enter movie title here" />
        <button type="submit">Search Movie</button>
      </form>
      <div>Movie/Show: {movie}</div>
      <div className="movies">
        {renderCards(moviesData)}
      </div>
      <div className="randomMovie">
        <button onClick={handleClick}>Random Movie</button>
        <div>Your random movie or show:</div>
        <div className="randomMovies">
          {renderCards(randomMovies)}
        </div>
      </div>
    </div>
  )
}

export default Form
