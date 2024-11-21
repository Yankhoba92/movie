import React, { useState } from "react";
import SearchBar from "./SearchBar";

const SearchResult = () => {
  const [movies, setMovies] = useState([]);
  const [order, setOrder]= useState("desc")

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

  const toggleOrder =()=>{
    setOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));

  }

  return (
    <div>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Recherche de Films</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="text-end mb-3">
          <button
            className="btn btn-secondary"
            onClick={toggleOrder}
          >
            Trier par Score IMDb ({order === "desc" ? "Décroissant" : "Croissant"})
          </button>
        </div>
        <div className="row">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={movie.image_url}
                    className="card-img-top"
                    alt={movie.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">Année : {movie.year}</p>
                    <p className="card-text">Score IMDb : {movie.imdb_score}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">Aucun film trouvé.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
