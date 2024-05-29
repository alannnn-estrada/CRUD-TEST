import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { NotFound } from "./pages/notFound";
import { Home } from "./pages/home";
// import { AuthProvider } from "./components/API/auth";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Dashboard } from "./pages/dashboard";
import { useAuth } from "./components/helpers/API/auth";

function App() {
  const { userName } = useAuth();

  return (
    <>
      <Routes>
        {userName !== null && userName !== undefined && userName !== "" ? (
          <>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;