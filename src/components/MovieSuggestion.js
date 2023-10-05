// src/components/MovieSuggestion.js

// Import de React pour créer un composant React.
import React from 'react';

// Import de `useNavigate` depuis 'react-router-dom' pour la navigation.
import { useNavigate } from 'react-router-dom';

// Définition du composant fonctionnel MovieSuggestion qui reçoit une prop "movie".
function MovieSuggestion({ movie }) {
  // Utilisation de `useNavigate` pour obtenir la fonction de navigation.
  const navigate = useNavigate();

  // Fonction pour gérer la sélection d'un film et naviguer vers sa page détaillée.
  const handleMovieSelect = () => {
    navigate(`/movie/${movie.id}`);
  };

  // Rendu du composant, qui affiche une suggestion de film.
  return (
    <div className="movie-suggestion" onClick={handleMovieSelect}>
      {/* Image du film (avec une image par défaut si aucune image n'est disponible) */}
      <img
        src={movie.poster_path
          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
          : '../images/no.png'}
        alt={movie.title}
      />
      {/* Titre du film */}
      <h4>{movie.title}</h4>
    </div>
  );
}

// Export du composant MovieSuggestion pour l'utiliser ailleurs.
export default MovieSuggestion;
