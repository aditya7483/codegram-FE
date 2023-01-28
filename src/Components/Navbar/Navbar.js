import React from "react";
import Login from "../Login/Login";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from '@mui/material/IconButton';

const Navbar = ({ loggedIn, setLoggedIn }) => {
  const handleLogout = () => {
    setLoggedIn(false)
    localStorage.removeItem("auth-token");
    window.location.reload();
  };

  return (
    <div>
      <nav className={`navbar navbar-expand-lg ${styles.nav_div}`}>
        <div className="container-fluid mynav-font">
          <Link to='/' style={{ textDecoration: 'none' }}>
            <h2 className={`${styles.logo} mb-0`} >CODEGRAM</h2></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-md-auto">
              <li className="nav-item mynav-txt mx-3">

                <Link to='/' className="nav-link fw-bold" aria-current="page">Home</Link>
              </li>
              <li className="nav-item dropdown">
                <Link to='/' className="nav-link dropdown-toggle fw-bold" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Projects
                </Link>
                <ul className="dropdown-menu">

                  {loggedIn &&
                    <>
                      <li>
                        <Link to="/project/new" className="dropdown-item fw-bold">
                          New Project
                        </Link>
                      </li>
                      <li>
                        <Link to="/project/myProjects" className="dropdown-item fw-bold">
                          My Projects
                        </Link>
                      </li>
                    </>
                  }
                </ul>
              </li>
            </ul>
            <div className="mx-3">
              <Link to="/Search" className="nav-link" href="#search">
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Link>
            </div>
            <form className="d-flex" role="search">
              {!loggedIn ? (
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
