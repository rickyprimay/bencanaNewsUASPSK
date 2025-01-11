import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Homepage from "./Pages/Home/HomePage/HomePage";
import About from "./Pages/Home/AboutPage/About";
import Dashboard from "./Pages/User/Dashboard/Dashboard";
import DetailNews from "./Pages/Home/DetailNews/DetailNews";
import AllNewsUser from "./Pages/User/AllNewsUser/AllNewsUser";
import RouteProtected from "./Components/RouteProtected";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/articles/:id" element={<DetailNews />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <RouteProtected>
              <Dashboard />
            </RouteProtected>
          }
        />
        <Route
          path="/dashboard/all-articles"
          element={
            <RouteProtected>
              <AllNewsUser />
            </RouteProtected>
          }
        />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
