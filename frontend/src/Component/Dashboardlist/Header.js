import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ setIsAdding }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <header>
      <h1>Student Management Software</h1>
      <div
        style={{
          marginTop: "30px",
          marginBottom: "18px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button onClick={() => setIsAdding(true)} className="round-button">
          Add Button
        </button>
        <button onClick={logout} className="round-button">
          Log out
        </button>
      </div>
    </header>
  );
}

export default Header;
