// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Importation depuis "react-dom/client" plutôt que "react-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Utilisation de createRoot depuis "react-dom/client"

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();



