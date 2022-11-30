import "./App.css";
import { Routes, Route, Navigate, Router } from "react-router-dom";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/Signup";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user, "localuser");
    setUser(user);
  }, [navigate]);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
    </div>
  );
}

export default App;
