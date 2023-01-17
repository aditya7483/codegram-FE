import React from 'react'
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./Globalproject.module.css"
function Globalproject() {
  return (
    <div className="container mt-3 p-3">
        <form className={`${styles.main_div} form-inline my-2 `}>
          <input
            className={`${styles.formc} form-control mr-sm-2 `}
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </form>
      </div>
  )
}

export default Globalproject
