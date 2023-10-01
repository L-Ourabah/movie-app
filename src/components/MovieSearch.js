import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MovieFilter from './MovieFilter'; // Importez le composant MovieFilter
import './MovieSearch.css';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState('');
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState('');
  const [directors, setDirectors] = useState([]);
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [title, setTitle] = useState('Popular Movies'); // Titre initial
  const apiKey = 'e79dc636a1494368d1855e984c4fdd2d';
  const navigate = useNavigate();

  useEffect(() => {
    fetchPopularMovies();
    fetchGenres();
    fetchActors();
    fetchDirectors();
  }, []);

  useEffect(() => {
    if (query || genre || actor || director || year) {
      fetchSearchMovies();
      const filterParts = [];
      if (genre) {
        const selectedGenre = genres.find(g => g.id === parseInt(genre))?.name;
        if (selectedGenre) {
          filterParts.push(selectedGenre);
        }
      }
      if (actor) {
        const selectedActor = actors.find(a => a.id === parseInt(actor))?.name;
        if (selectedActor) {
          filterParts.push(selectedActor);
        }
      }
      if (director) {
        const selectedDirector = directors.find(d => d.id === parseInt(director))?.name;
        if (selectedDirector) {
          filterParts.push(selectedDirector);
        }
      }
      if (year) {
        filterParts.push(year);
      }

      setTitle(filterParts.length > 0 ? filterParts.join(' - ') : 'Resultat recherche');
    } else {
      setTitle('Popular Movies');
    }
  }, [query, genre, actor, director, year]);

  const fetchSearchMovies = async () => {
    try {
      const params = {
        api_key: apiKey,
        query,
        with_genres: genre !== '' ? genre : undefined,
        with_cast: actor !== '' ? actor : undefined,
        with_crew: director !== '' ? director : undefined,
        year,
      };

      const response = await axios.get(
        'https://api.themoviedb.org/3/search/movie',
        { params }
      );

      setSearchMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching search data:', error);
    }
  };

  const fetchPopularMovies = async () => {
    try {
      const params = {
        api_key: apiKey,
        with_genres: genre !== '' ? genre : undefined,
        with_cast: actor !== '' ? actor : undefined,
        with_crew: director !== '' ? director : undefined,
        year,
      };

      const response = await axios.get(
        'https://api.themoviedb.org/3/discover/movie',
        { params }
      );

      setPopularMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching popular data:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/genre/movie/list',
        {
          params: {
            api_key: apiKey,
          },
        }
      );

      setGenres(response.data.genres);
    } catch (error) {
      console.error('Error fetching genre data:', error);
    }
  };

  const fetchActors = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/person/popular',
        {
          params: {
            api_key: apiKey,
          },
        }
      );

      setActors(response.data.results);
    } catch (error) {
      console.error('Error fetching actor data:', error);
    }
  };

  const fetchDirectors = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/person/popular',
        {
          params: {
            api_key: apiKey,
          },
        }
      );

      setDirectors(response.data.results);
    } catch (error) {
      console.error('Error fetching director data:', error);
    }
  };

  const handleMovieSelect = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-search">
      <h1>Movie app</h1> {/* Utilise le titre dynamique ici */}
      <div className="option">
      <div className="recherche">

        {/* Input de recherche de films */}
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Bouton de recherche */}
        <button
          onClick={() => {
            fetchSearchMovies();
          }}
        >
          Search
        </button>
      </div>
      {/* Utilisation du composant MovieFilter pour les filtres */}
      <MovieFilter
        genres={genres}
        genre={genre}
        actors={actors}
        actor={actor}
        directors={directors}
        director={director}
        year={year}
        onGenreChange={(e) => setGenre(e.target.value)}
        onActorChange={(e) => setActor(e.target.value)}
        onDirectorChange={(e) => setDirector(e.target.value)}
        onYearChange={(e) => setYear(e.target.value)}
        onFilterSubmit={() => {
          fetchPopularMovies(); // Recharge les films populaires avec les filtres appliqués
        }}
      />
</div>
      {/* Affichage des résultats de recherche ou des films populaires */}
      {searchMovies.length > 0 && (
        <>
          <h2>{title}</h2>
          <ul>
            {searchMovies.map((movie) => (
              <li key={movie.id}>
                <h3>{movie.title}</h3>
                
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  onClick={() => handleMovieSelect(movie)}
                />
                <p>Rating: {movie.vote_average}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      {popularMovies.length > 0 && (
        <>
          <h2>{title}</h2>
          <ul>
            {popularMovies.map((movie) => (
              <li key={movie.id}>
                <h3>{movie.title}</h3>
                
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  onClick={() => handleMovieSelect(movie)}
                />
                <p>Rating: {movie.vote_average}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      {searchMovies.length === 0 && popularMovies.length === 0 && (
        <p>No movies found.</p>
      )}
    </div>
  );
}

export default MovieSearch;
