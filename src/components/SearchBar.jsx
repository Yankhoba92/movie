import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchT, setSearchT] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchT.trim()) {
      onSearch(searchT);
    }
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
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
