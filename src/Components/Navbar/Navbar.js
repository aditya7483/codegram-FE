import React from "react";
import Login from "../Login/Login";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    window.location.reload();
  };
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate("/Search");
  };
  return (
    <div>
      <nav className={`navbar navbar-expand-lg ${styles.nav_div}`}>
        <div className="container-fluid mynav-font">
          <h2 className={`${styles.logo} mb-0`}>CODEGRAM</h2>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-md-auto">
              <li className="nav-item mynav-txt mx-3">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to="/"
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Projects
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/project/new" className="dropdown-item">
                      New Project
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="dropdown-item">
                      My Projects
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="dropdown-item">
                      Gloal Projects
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item mynav-txt mx-3">
                <Link to="/" className="nav-link" href="#contact">
                  Contact Us
                </Link>
              </li>
            </ul>
            <div className="mx-3">
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </div>
            <form className="d-flex" role="search">
              {!props.logged ? (
                <button
                  type="button"
                  className={`btn_prim ${styles.btn_prim}`}
                  data-bs-toggle="modal"
                  data-bs-target="#LoginModal"
                >
                  Login
                </button>
              ) : (
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </form>
            <Login />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
