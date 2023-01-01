import React, { useState } from 'react'
import inputData from '../../Common-Resources/inputData.json'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import styles from './ProfileSetting.module.css'
function ProfileSetting() {
  const [fields, setFields] = useState({
    email: '',
    name: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault()}
  const handleChange = (e) => {
    const { name, value } = e.target
    setFields({
      ...fields,
      [name]: value
    })
  }
  return (
    <div className="container mt-3">
      <h1 className="text-center ">Public Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input className="form-control"
            type="text"
            id="name"
            name="name"
            value={fields.name} required
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input className="form-control"
            type="email"
            id="email"
            name="email"
            onChange={handleChange} 
            value={fields.email} required
          />
          <div id="emailhelp" className="form-text" >We'll Never Share Your Email With Anyone Else.</div>
        </div>
        <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Select Your Skills</label>
    <Autocomplete
          clearOnEscape
          id="combo-box-2"
          options={inputData.skills.data}
          renderInput={(params) => <TextField {...params} variant="standard" />}
        />
  </div>
        <div className="mt-5">
        <button type="submit" className={`${styles.submit_btn} btn_prim `}>
          Submit
        </button>
        </div>
      </form>
    </div>
  )
}

export default ProfileSetting