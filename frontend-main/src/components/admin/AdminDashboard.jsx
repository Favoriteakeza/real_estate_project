import React, { useEffect, useRef } from "react";
import "./admin.css";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const AdminDashboard =() => {
  // Static data
  const data = {
    ongoingProjects: 8,
    completedProjects: 15,
    pendingTasks: 20,
    totalMaterials: 500,
    upcomingDeadlines: 3,
    budgetUtilization: "75%",
    teamMembers: 25,
  };
const dashboardRef = useRef()
  
  
    const location = useLocation();
    
    // useEffect to scroll after the page is loaded
    useEffect(() => {
      if (location.state && location.state.scrollTo) {
        const sectionId = location.state.scrollTo;
        const sectionRef = {
         "dashboard": dashboardRef
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
    <div className="dashboard__container">
      <h1 className="dashboard__title" ref={dashboardRef} id="dashboard"> 
        Dashboard</h1>
      <p className="dashboard__subtitle">
        Welcome! Here's an overview of business operations at a glance.
      </p>
      <div className="dashboard__summary">
        {/* Summary Cards */}
        <div className="dashboard__card">
          <h2 className="card__title">Ongoing Projects</h2>
          <p className="card__value">{data.ongoingProjects}</p>
        </div>
        <div className="dashboard__card">
          <h2 className="card__title">Completed Projects</h2>
          <p className="card__value">{data.completedProjects}</p>
        </div>
        <div className="dashboard__card">
          <h2 className="card__title">Pending Tasks</h2>
          <p className="card__value">{data.pendingTasks}</p>
        </div>
        <div className="dashboard__card">
          <h2 className="card__title">Materials Used</h2>
          <p className="card__value">{data.totalMaterials} Units</p>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="dashboard__details">
        <div className="details__card">
          <h3>Budget Utilization</h3>
          <p>{data.budgetUtilization} of allocated budget</p>
        </div>
        <div className="details__card">
          <h3>Upcoming Deadlines</h3>
          <p>{data.upcomingDeadlines} projects due this month</p>
        </div>
        <div className="details__card">
          <h3>Team Members</h3>
          <p>{data.teamMembers} active team members</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="dashboard__activity">
        <h2>Recent Activity</h2>
        <ul className="activity__list">
          <li>Project "Sunrise Villas" moved to final review.</li>
          <li>Task "Material Purchase for Downtown Apartments" marked as completed.</li>
          <li>New team member "John Doe" added to Project Alpha.</li>
        </ul>
      </div>
    </div><Footer /></>
  );
};

export default AdminDashboard;
