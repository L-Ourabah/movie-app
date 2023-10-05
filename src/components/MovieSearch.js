// src/components/MovieSearch.js

// Import de React et des autres modules nécessaires.
import React, { useState, useEffect } from 'react'; // Import de React, useState et useEffect depuis React.
import axios from 'axios'; // Import d'axios pour effectuer des requêtes HTTP.
import { useNavigate } from 'react-router-dom'; // Import de `useNavigate` depuis 'react-router-dom' pour la navigation.
import MovieFilter from './MovieFilter'; // Import du composant MovieFilter depuis le fichier local.
import './MovieSearch.css'; // Import du fichier de styles CSS pour ce composant.

// Déclaration du composant fonctionnel MovieSearch.
function MovieSearch() {
  // Déclaration des états pour stocker les données de recherche et de filtrage.
  const [query, setQuery] = useState(''); // État pour stocker le terme de recherche.
  const [searchMovies, setSearchMovies] = useState([]); // État pour stocker les résultats de recherche.
  const [popularMovies, setPopularMovies] = useState([]); // État pour stocker les films populaires.
  const [genres, setGenres] = useState([]); // État pour stocker les genres de film.
  const [genre, setGenre] = useState(''); // État pour stocker le genre sélectionné.
  const [actors, setActors] = useState([]); // État pour stocker les acteurs populaires.
  const [actor, setActor] = useState(''); // État pour stocker l'acteur sélectionné.
  const [directors, setDirectors] = useState([]); // État pour stocker les réalisateurs populaires.
  const [director, setDirector] = useState(''); // État pour stocker le réalisateur sélectionné.
  const [year, setYear] = useState(''); // État pour stocker l'année sélectionnée.
  const [title, setTitle] = useState('Popular Movies'); // État pour stocker le titre de la page (initialisé comme "Popular Movies").
  const apiKey = process.env.REACT_APP_API_KEY; // Récupération de la clé d'API depuis les variables d'environnement.
  const navigate = useNavigate(); // Récupération de la fonction de navigation pour la navigation entre les pages.

  // Utilisation de useEffect pour effectuer des actions lors du chargement initial du composant.
  useEffect(() => {
    fetchPopularMovies(); // Appel à la fonction pour récupérer les films populaires.
    fetchGenres(); // Appel à la fonction pour récupérer les genres de film.
    fetchActors(); // Appel à la fonction pour récupérer les acteurs populaires.
    fetchDirectors(); // Appel à la fonction pour récupérer les réalisateurs populaires.
  }, []);

  // Utilisation de useEffect pour déclencher des actions lorsque les états de recherche ou de filtrage changent.
// Utilisation de useEffect pour déclencher des actions lorsque les états de recherche ou de filtrage changent.
useEffect(() => {
  // Vérifie si au moins l'un des états (query, genre, actor, director, year) est défini.
  if (query || genre || actor || director || year) {
    // Appel à la fonction fetchSearchMovies pour récupérer les résultats de recherche.
    fetchSearchMovies();
    // Initialisation d'un tableau filterParts pour stocker les parties du filtre.
    const filterParts = [];

    // Vérifie si l'état genre est défini.
    if (genre) {
      // Trouve le genre correspondant dans la liste des genres et récupère son nom.
      const selectedGenre = genres.find(g => g.id === parseInt(genre))?.name;
      // Si un genre est trouvé, ajoute-le à filterParts.
      if (selectedGenre) {
        filterParts.push(selectedGenre);
      }
    }

    // Vérifie si l'état actor est défini.
    if (actor) {
      // Trouve l'acteur correspondant dans la liste des acteurs et récupère son nom.
      const selectedActor = actors.find(a => a.id === parseInt(actor))?.name;
      // Si un acteur est trouvé, ajoute-le à filterParts.
      if (selectedActor) {
        filterParts.push(selectedActor);
      }
    }

    // Vérifie si l'état director est défini.
    if (director) {
      // Trouve le réalisateur correspondant dans la liste des réalisateurs et récupère son nom.
      const selectedDirector = directors.find(d => d.id === parseInt(director))?.name;
      // Si un réalisateur est trouvé, ajoute-le à filterParts.
      if (selectedDirector) {
        filterParts.push(selectedDirector);
      }
    }

    // Vérifie si l'état year est défini.
    if (year) {
      // Ajoute l'année à filterParts.
      filterParts.push(year);
    }

    // Définition du titre en fonction des filtres appliqués. Si au moins un filtre est appliqué, les parties sont concaténées.
    // Sinon, le titre est rétabli à "Popular Movies".
    setTitle(filterParts.length > 0 ? filterParts.join(' - ') : 'Résultats de recherche');
  } else {
    setTitle('Popular Movies'); // Rétablissement du titre à "Popular Movies" si aucun filtre n'est appliqué.
  }
}, [query, genre, actor, director, year]);



// Fonction asynchrone pour récupérer les films de recherche à partir de l'API TMDB.
const fetchSearchMovies = async () => {
  try {
    // Crée un objet `params` contenant les paramètres de la requête à l'API TMDB.
    const params = {
      api_key: apiKey, // Utilise la clé d'API définie précédemment.
      query, // Utilise le terme de recherche stocké dans l'état `query`.
      with_genres: genre !== '' ? genre : undefined, // Utilise le genre sélectionné s'il est défini, sinon, n'inclut pas ce paramètre.
      with_cast: actor !== '' ? actor : undefined, // Utilise l'acteur sélectionné s'il est défini, sinon, n'inclut pas ce paramètre.
      with_crew: director !== '' ? director : undefined, // Utilise le réalisateur sélectionné s'il est défini, sinon, n'inclut pas ce paramètre.
      year, // Utilise l'année sélectionnée.
    };

    // Effectue une requête GET à l'URL de l'API TMDB pour rechercher des films, en incluant les paramètres définis dans `params`.
    const response = await axios.get(
      'https://api.themoviedb.org/3/search/movie',
      { params }
    );

    // Met à jour l'état `searchMovies` avec les résultats de la recherche obtenus à partir de la réponse de l'API.
    setSearchMovies(response.data.results);

    // Affiche les résultats de la recherche dans la console à des fins de débogage.
    console.log(response.data.results);
  } catch (error) {
    // En cas d'erreur, affiche un message d'erreur dans la console.
    console.error('Erreur lors de la récupération des données de recherche :', error);
  }
};


  // Fonction asynchrone pour récupérer les films populaires à partir de l'API TMDB.
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
      console.error('Erreur lors de la récupération des données populaires :', error);
    }
  };

  // Fonction asynchrone pour récupérer les genres de film à partir de l'API TMDB.
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
      console.error('Erreur lors de la récupération des données de genre :', error);
    }
  };

  // Fonction asynchrone pour récupérer les acteurs populaires à partir de l'API TMDB.
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
      console.error('Erreur lors de la récupération des données d\'acteur :', error);
    }
  };

  // Fonction asynchrone pour récupérer les réalisateurs populaires à partir de l'API TMDB.
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
      console.error('Erreur lors de la récupération des données de réalisateur :', error);
    }
  };

  // Fonction pour gérer la sélection d'un film et naviguer vers sa page détaillée.
  const handleMovieSelect = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  // Rendu du composant MovieSearch.
  return (
    <div className="movie-search">
      <h1>Movie app</h1>
      
      <div className="option">
        <div className="recherche">
          {/* Input de recherche de films */}
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Bouton de recherche */}
          <button className='btn-rech'
            onClick={() => {
              fetchSearchMovies(); 
            }}
          >
           🔎
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
    {/* Affiche le titre de la section, qui est défini en fonction des filtres ou de "Popular Movies". */}
    <h2>{title}</h2>
    <ul>
      {/* Utilise la méthode `map` pour parcourir chaque film dans la liste des résultats de recherche (searchMovies). */}
      {searchMovies.map((movie) => (
  // Pour chaque film dans la liste `searchMovies`, crée un élément de liste `<li>` avec une clé unique basée sur l'ID du film.
  <li key={movie.id}>
    {/* Affiche le titre du film dans une balise `<h3>`. */}
    <h3>{movie.title}</h3>

          {/* Affiche l'image du film en utilisant l'URL de base de l'affiche (poster_path). */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            onClick={() => handleMovieSelect(movie)} // Gère le clic sur l'image pour afficher les détails du film.
          />
          {/* Affiche la note du film sous forme d'icône étoile et la note moyenne. */}
          <p className='note'>⭐ {movie.vote_average}</p>
          {/* Affiche le nombre de votants pour le film. */}
          <p className='vote'>Nombre de votants {movie.vote_count}</p>
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
                <p className='note'>⭐ {movie.vote_average}</p>
                <p className='vote'>Nombre de votants {movie.vote_count}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Message en cas de résultats vides */}
      {searchMovies.length === 0 && popularMovies.length === 0 && (
        <p>Aucun film trouvé.</p>
      )}
    </div>
  );
}

// Export du composant MovieSearch pour l'utiliser ailleurs.
export default MovieSearch;

