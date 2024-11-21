import React, { useEffect, useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchT, setSearchT] = useState("");
  const [selectGenre, setSelectGenre] = useState("");
  const [resultCount, setResultCount] = useState(6);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchT.trim()) {
      onSearch(searchT, selectGenre, resultCount);
    }
  };
  // Fetch genres from the API
  const [genres, setGenres] = useState([]);
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
              value={searchT}
              onChange={(e) => setSearchT(e.target.value)}
              placeholder="Search"
              aria-label="Search"
            />
            <select
              className="form-select me-2"
              value={selectGenre}
              onChange={(e) => setSelectGenre(e.target.value)}
            >
              <option value="">Sélectionner un genre</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              className="form-control me-2"
              value={resultCount}
              onChange={(e) => setResultCount(e.target.value)}
              min="1"
              placeholder="Résultats"
            />
            
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
