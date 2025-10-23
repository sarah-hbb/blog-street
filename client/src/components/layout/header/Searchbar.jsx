import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const navigae = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSearchTerm("");
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigae(`/search?${searchQuery}`);
  };

  return (
    <form
      className="bg-red relative bg-cyan-100/15 px-3 rounded-2xl flex items-center gap-1 lg:w-2/5 
       hover:shadow-cyan-600 focus:shadow-cyan-600 shadow-md transition-all ease-in-out w-3/5"
      onSubmit={handleSearch}
    >
      <input
        className="rounded-md min-h-10/4 px-3 bg-transparent py-1 w-full 
        border-none outline-none text-cyan-100 not-placeholder-shown:bg-transparent"
        type="text"
        name="search"
        placeholder="search in blog..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="border-l-2 border-cyan-100">
        <FiSearch className="text-cyan-100 text-2xl hover:scale-125 transition-transform ml-1" />
      </button>
    </form>
  );
};

export default Searchbar;
