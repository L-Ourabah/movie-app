// src/components/MovieSuggestion.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MovieSuggestion({ movie }) {
  const navigate = useNavigate();

  const handleMovieSelect = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-suggestion" onClick={handleMovieSelect}>
      <img
       

        src={movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : '../images/no.png'}
          alt={movie.title}

      />
      <h4>{movie.title}</h4>
    </div>
  );
}

export default MovieSuggestion;
