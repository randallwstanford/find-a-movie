import React from 'react';

const renderDirectors = (directors) => (directors !== null ? directors.slice(0, 3).join(' / ') : null);

const renderRating = (rated) => (rated !== null ? rated : 'Not rated');

const renderCards = (moviesData) => {
  return moviesData
    ? moviesData.map((movieData, index) => (
      <div key={index} className="movieCard">
        <a target="_blank" href={`https://www.imdb.com/title/${movieData.imdb_id}/`} rel="noreferrer">
          <div>Title: {movieData.title}</div>
          <div>Year: {movieData.year}</div>
          { movieData.directors
            ? (
              <>
                <div>Score: {movieData.imdb_rating}</div>
                <div>Directors: {renderDirectors(movieData.directors)}</div>
                <div>Rating: {renderRating(movieData.rated)}</div>
              </>
            ) : <div>IMDB id: {movieData.imdb_id}</div>}
        </a>
      </div>
    ))
    : <div>No results</div>;
};

export default renderCards;
