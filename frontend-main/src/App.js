import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import About from "./components/about/About";
import Contact from "./components/contacts/Contact";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import AdminDashboard from "./components/admin/AdminDashboard";
import UnAuthorized from "./components/unauthorized/UnAuthorized";
import Logout from "./Logout";
import Notfound from "./components/unauthorized/Notfound";
import Navbar from "./components/navbar/Navbar";
import Project from "./components/Project/Project"
import GlobalSearch from "./components/grobalsearch/GrobalSearch";
import VerifyEmail from "./components/verifyEmail/verifyEmail";
import ResetRequest from "./components/forgetPassword/ResetRequest";
import ResetPassword from "./components/resetPassword/ResetPassword";
import AdminRoute from "./AdminRoute";

function AppContent({ siteContent, url }) {
  const location = useLocation();

  // Pages where GlobalSearch should NOT appear
  const excludedRoutes = [
    '/login',
    '/verify-email',
    '/request-reset',
    '/reset-password',
    '/signup',
    '/unauthorized',
    '/logout',
  ];

  const isExcluded = excludedRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="App">
      {/* Conditionally render GlobalSearch */}
      {!isExcluded && <GlobalSearch data={siteContent} />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Project />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login url={url} />} />
        <Route path="/verify-email" element={<VerifyEmail url={url} />} />
        <Route path="/request-reset" element={<ResetRequest url={url} />} />
        <Route path="/reset-password/:token" element={<ResetPassword url={url} />} />
        <Route path="/signup" element={<SignUp url={url} />} />
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="/logout" element={<Logout url={url} />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard url={url} /></AdminRoute>} />

        {/* Fallback Route */}
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </div>
  );
}
function App() {
  const url = "http://localhost:5000/";
  const siteContent = 
  [
    {
      "id": 1,
      "name": "About Us",
      "path": "/about",
      "content": "Why You Choose Us? we provide full Services Trusted by Thousands we work with over a thousand of people from all part of Country and Africa Dream House we have all types of houses we are here to serve our client Easy&Fast Payment we work with over a thousand of people from all part of Country and Africa"
    },
    {
      "id": 2,
      "name": "Contact",
      "path": "/contact",
      "content": "Contact us today. We are here to serve you with dedication and professionalism."
    },
    {
      "id": 3,
      "name": "Projects",
      "path": "/projects",
      "content": "Housing Projects Name	Location	Start Date	End Date	Budget	Actions Current projects include Greenwood Estate in New York, Sunny Apartments in California, Oceanview Villas in Florida, Highland Meadows in Texas, Maplewood Estate in Ohio, Willow Creek in Oregon, Rosewood Villas in Nevada, Aspen Heights in Colorado, Cedar Ridge in Utah, and Birchwood Estates in Washington. Each project is on track with dedicated budgets and timelines. 2023-01-01	2023-12-31	$5,000,000	 2023-03-15	2024-03-15	$3,200,000 2023-06-01	2024-06-01	$7,800,000 2023-02-01	2024-01-15	$4,500,000 2023-08-01	2024-07-31	$6,000,000 2023-11-01	2024-10-31	$3,800,000 2023-04-01	2024-03-31	$5,200,000 2023-09-01	2024-08-31	$4,900,000 2023-05-01	2024-04-30	$6,700,000 2023-07-01	2024-06-30	$7,100,000"
    },
    {
      "id": 4,
      "name": "Home",
      "path": "/",
      "content": "Welcome to Real Estate Solutions Your trusted partner in real estate development and investment. Get Started Key Features Comprehensive property listings Customizable real estate solutions Professional consultation services"
    },
    {
      "id": 5,
      "name": "Dashboard",
      "path": "/admin",
      "content": "Dashboard Welcome! Here's an overview of business operations at a glance. Ongoing Projects 8 Completed Projects 15 Pending Tasks 20 Materials Used 500 Units Budget Utilization 75% of allocated budget Upcoming Deadlines 3 projects due this month Team Members 25 active team members Recent Activity Project Sunrise Villas moved to final review. Task Material Purchase for Downtown Apartments marked as completed. New team member John Doe added to Project Alpha."
    }
  ]
  

  return (
    <Router>
      <AppContent siteContent={siteContent} url={url} />
    </Router>
  );
}

export default App;