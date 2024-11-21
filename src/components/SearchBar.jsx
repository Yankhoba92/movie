import React, { useEffect, useState } from "react";

const SearchBar = ({ onSearch }) => {
  // Mes états
  const [searchText, setSearchText] = useState("");
  const [selectGenre, setSelectGenre] = useState("");
  const [resultCount, setResultCount] = useState(6);
  const [genres, setGenres] = useState([]);

  // fonction pour déclancher la recherche en passant les critéres selectionnés 
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      onSearch(searchText, selectGenre, resultCount);
    }
  };
  // Fetch  des genres disponibles sur l'API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("https://test.ad-lab.ovh/api/v1/genres/");
        const data = await response.json();
        setGenres(data.results);
      } catch (error) {
        console.error("Erreur lors de la récupération des genres :", error);
      }
    };
    fetchGenres();
  }, []);

  return (
    <div>
      <nav className="navbar ">
        <div className="container-fluid">
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}// Met à jour le texte de recherche
              placeholder="Search"
              aria-label="Search"
            />
            {/* Selecteur pour choisir le genre */}
            <select
              className="form-select me-2"
              value={selectGenre}
              onChange={(e) => setSelectGenre(e.target.value)} // Met à jour le genre
            >
              <option value="">Sélectionner un genre</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
            {/* Champs pour définir le nombre de résultat à afficher */}
            <input
              type="number"
              className="form-control me-2"
              value={resultCount}
              onChange={(e) => setResultCount(e.target.value)}  // Met à jour le nombre de film à afficher
              min="1"
              placeholder="Résultats"
            />
            {/* Bouton pour lancer la recherche */}
            <button type="submit" className="btn btn-outline-success">
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default SearchBar;
