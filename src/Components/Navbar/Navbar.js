import React from 'react'
import Login from '../Login/Login'
import styles from './Navbar.module.css'

const Navbar = (props) => {

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.reload();
  }

  return (
    <div>
      <nav className={`navbar navbar-expand-lg ${styles.nav_div}`}>
        <div className="container-fluid mynav-font">
          <h2 className={`${styles.logo} mb-0`} href="#">CODEGRAM</h2>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-md-auto">
              <li className="nav-item mynav-txt mx-3">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Projects
                </a>
                <ul className={`dropdown-menu ${styles.dropdown}`}>
                  <li><a className="dropdown-item" href="#">New Project</a></li>
                  <li><a className="dropdown-item" href="#">My Projects</a></li>
                  <li><a className="dropdown-item" href="#">Gloal Projects</a></li>
                </ul>
              </li>
              <li className="nav-item mynav-txt mx-3">
                <a className="nav-link" href="#contact">Contact Us</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              {!props.logged ? <button type="button" className={`btn_prim ${styles.btn_prim}`} data-bs-toggle="modal" data-bs-target="#LoginModal">
                Login
              </button> :
                <button className='btn btn-outline-secondary' onClick={handleLogout}>Logout</button>
              }
            </form>
            <Login />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar