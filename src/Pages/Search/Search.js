import React from 'react'
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
function Search() {
  return (
    <div>
      <div className="container mt-3 p-3">
      <form className="form-inline my-2 ">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      </form>
      </div>
    </div>
  )
}

export default Search
