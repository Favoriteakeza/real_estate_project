// src/contexts/SearchContext.js
import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchIndex, setSearchIndex] = useState({}); // Holds all indexed page content

  return (
    <SearchContext.Provider value={{ searchIndex, setSearchIndex }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
