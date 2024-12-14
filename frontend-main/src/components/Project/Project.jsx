import React, { useEffect, useRef, useState } from "react";
import "./project.css";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Project = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Number of items per page

  // Static data for projects
  const projects = [
    { id: 1, name: "Greenwood Estate", location: "New York", startDate: "2023-01-01", endDate: "2023-12-31", budget: "$5,000,000" },
    { id: 2, name: "Sunny Apartments", location: "California", startDate: "2023-03-15", endDate: "2024-03-15", budget: "$3,200,000" },
    { id: 3, name: "Oceanview Villas", location: "Florida", startDate: "2023-06-01", endDate: "2024-06-01", budget: "$7,800,000" },
    { id: 4, name: "Highland Meadows", location: "Texas", startDate: "2023-02-01", endDate: "2024-01-15", budget: "$4,500,000" },
    { id: 5, name: "Maplewood Estate", location: "Ohio", startDate: "2023-08-01", endDate: "2024-07-31", budget: "$6,000,000" },
    { id: 6, name: "Willow Creek", location: "Oregon", startDate: "2023-11-01", endDate: "2024-10-31", budget: "$3,800,000" },
    { id: 7, name: "Rosewood Villas", location: "Nevada", startDate: "2023-04-01", endDate: "2024-03-31", budget: "$5,200,000" },
    { id: 8, name: "Aspen Heights", location: "Colorado", startDate: "2023-09-01", endDate: "2024-08-31", budget: "$4,900,000" },
    { id: 9, name: "Cedar Ridge", location: "Utah", startDate: "2023-05-01", endDate: "2024-04-30", budget: "$6,700,000" },
    { id: 10, name: "Birchwood Estates", location: "Washington", startDate: "2023-07-01", endDate: "2024-06-30", budget: "$7,100,000" },
  ];

  // Filtered projects based on search term
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
 const ProjectHouseRef = useRef()
  
  
    const location = useLocation();
    
    // useEffect to scroll after the page is loaded
    useEffect(() => {
      if (location.state && location.state.scrollTo) {
        const sectionId = location.state.scrollTo;
        const sectionRef = {
         "ProjectHouse": ProjectHouseRef
        }[sectionId];
    
        // Delay scroll by a bit to ensure the element is rendered
        if (sectionRef && sectionRef.current) {
          setTimeout(() => {
            sectionRef.current.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    }, [location]);
  return (
    <><Navbar />
    <div className="project__container">
      <h1 className="project__title"ref={ProjectHouseRef}id="ProjectHouse">
        Housing Projects</h1>

      <div className="project__search">
        <input
          type="text"
          placeholder="Search projects by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
        />
      </div>

      <table className="project__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Budget</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.length > 0 ? (
            currentProjects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.location}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>{project.budget}</td>
                <td>
                  <button
                    className="project__btn"
                    onClick={() => alert(`Viewing tasks and materials for ${project.name}`)}
                  >
                    View/Manage
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No projects found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="project__pagination">
        <button
          className="pagination__btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`pagination__btn ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="pagination__btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div><Footer/></>
  );
};

export default Project;
