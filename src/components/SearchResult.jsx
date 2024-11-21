import React, { useState } from "react";
import SearchBar from "./SearchBar";

const SearchResult = () => {
  // Mes états
  const [movies, setMovies] = useState([]);
  const [order, setOrder] = useState("desc");

  // Fonction pour gérer la recherche
  const handleSearch = async (query, genre, count) => {
    try {
      let url = `https://test.ad-lab.ovh/api/v1/titles/?title_contains=${query}&genre_contains=${genre}&page_size=${count}&sort_by=-imdb_score`;

      // Si l'utilisateur choisit un tri croissant, on ajuste l'URL
      if (order === "asc") {
        url = `https://test.ad-lab.ovh/api/v1/titles/?title_contains=${query}&genre_contains=${genre}&page_size=${count}&sort_by=imdb_score`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data.results);
      setMovies(data.results);
    } catch (error) {
      console.error("Erreur lors de la récupération des films :", error);
    }
  };

  // Fonction pour inverser l'ordre de tri
  const toggleOrder = () => {
    setOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  };

  return (
    <div>
      <div className="container mt-5">
        <h1 className="text-center mb-4 ">🎥 Recherche de Films</h1>
        {/* Barre de recherche composant */}
        <SearchBar onSearch={handleSearch} />
        {/* Bouton pour l'odre de tri */}
        <div className="text-end mb-3">
          <button className="btn btn-secondary" onClick={toggleOrder}>
            Trier par Score IMDb (
            {order === "desc" ? "Décroissant" : "Croissant"})
          </button>
        </div>
        {/* Résultats des recherches */}
        <div className="row">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="col-md-4 mb-4">
                <div className="card border-light shadow-sm">
                  <img
                    className="card-img-top"
                    src={movie.image_url}
                    alt={movie.title}
                  />
                  <div className="card-body">
                    <h3 className="card-title">{movie.title}</h3>
                    <p className="card-text">
                      <span>Année :</span> {movie.year}
                    </p>
                    <p className="card-text">
                      <span>Score IMDb :</span> {movie.imdb_score}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Aucun film trouvé.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
