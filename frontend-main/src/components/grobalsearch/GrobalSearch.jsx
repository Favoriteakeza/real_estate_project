import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./globalSearch.css";

const GlobalSearch = ({ data }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);

    if (searchQuery.trim() === "") {
      setResults([]);
      return;
    }

    const filteredResults = data.filter((item) =>
      item.content.toLowerCase().includes(searchQuery)
    );

    setResults(filteredResults);
  };
  const sectionIdMapping = {
    1: "whyChooseUs",        // About Us
    2: "ContactUS",
    3: "ProjectHouse",//Projects"
    4: "Home",     // Home
    5: "dashboard",          // Dashboard
  };
  
  // Global search result click handler
  const handleResultClick = (result) => {
    // Map the result.id to the specific section ID
    const sectionId = sectionIdMapping[result.id];
  
    if (sectionId) {
      // Navigate to the target page and pass the sectionId in the state
      navigate(result.path, { state: { scrollTo: sectionId } });
    }
  
    setQuery("");  // Clear the query input
    setResults([]);  // Clear the search results
  };
  
  
  // Function to extract and limit the content to 20 characters around the searched word
  const getTruncatedContent = (content, searchQuery) => {
    const startIndex = content.toLowerCase().indexOf(searchQuery);
    if (startIndex === -1) return ""; // In case the search term is not found

    const truncatedContent = content.slice(startIndex, startIndex + 20); // Get 20 characters starting from the search term
    return truncatedContent;
  };

  return (
    <div className="global-search">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search across pages..."
        className="search-input"
      />
      {results.length > 0 && (
        <ul className="search-results">
          {results.map((result) => (
            <li
              key={result.id}
              onClick={() => handleResultClick(result)}
              className="search-result-item"
            >
              <strong>{result.name}</strong>
              <p>{getTruncatedContent(result.content, query)}...</p> {/* Display truncated content */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GlobalSearch;
