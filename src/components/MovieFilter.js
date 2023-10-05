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
    <div className="movie-filter">
      
      <div>
        <label htmlFor="genre">Genre:</label>
        <select id="genre" value={genre} onChange={onGenreChange}>
          <option value="">All</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="actor">Actor:</label>
        <select id="actor" value={actor} onChange={onActorChange}>
          <option value="">All</option>
          {actors.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="director">Director:</label>
        <select id="director" value={director} onChange={onDirectorChange}>
          <option value="">All</option>
          {directors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="year">Year:</label>
        <input
          type="text"
          id="year"
          value={year}
          onChange={onYearChange}
          placeholder="Enter a year"
        />
      </div>
      <button className='btn-fitre' onClick={onFilterSubmit}>🎚️</button>
    </div>
  );
}

export default MovieFilter;