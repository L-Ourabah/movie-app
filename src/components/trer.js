// src/components/MovieFilter.js
import React from 'react';

function MovieFilter({
  genres,
  genre,
  actors,
  actor,
  directors,
  director,
  year,
  onGenreChange,
  onActorChange,
  onDirectorChange,
  onYearChange,
  onFilterSubmit,
}) {
  return (
    <div className="filters">
      <select value={genre} onChange={onGenreChange}>
        <option value="">Genre</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <select value={actor} onChange={onActorChange}>
        <option value="">Actor</option>
        {actors.map((actor) => (
          <option key={actor.id} value={actor.name}>
            {actor.name}
          </option>
        ))}
      </select>
      <select value={director} onChange={onDirectorChange}>
        <option value="">Director</option>
        {directors.map((director) => (
          <option key={director.id} value={director.name}>
            {director.name}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Year" value={year} onChange={onYearChange} />
      <button onClick={onFilterSubmit}>Filter</button>
    </div>
  );
}

export default MovieFilter;
