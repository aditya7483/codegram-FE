import React, { useState } from 'react'
import styles from './NewProject.module.css'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import inputData from '../../../Common-Resources/inputData.json'

const NewProject = () => {

  const [fields, setFields] = useState({
    name: '',
    type: '',
    requirements: []
  });

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className={`${styles.main_div} d-flex flex-column align-items-center my-4`}>
      <h2 className={`${styles.heading} text-center mb-3`}>Create New Project</h2>
      <form className={`${styles.form_div} d-flex flex-column`}>
        <TextField id="standard-basic" className='my-4' label="Project Name" variant="standard" />
        <Autocomplete
          disableClearable
          clearOnEscape
          id="combo-box-1"
          className='my-4'
          options={inputData.projectDomains.data}
          renderInput={(params) => <TextField {...params} variant="standard" label="Project Type" />}
        />
        <Autocomplete
          disableClearable
          clearOnEscape
          id="combo-box-2"
          className='my-4'
          options={inputData.skills.data}
          renderInput={(params) => <TextField {...params} variant="standard" label="Project Requirements" />}
        />
        <button type="submit" onClick={handleSubmit} className={`${styles.submit_btn} align-self-center btn_prim my-3`}>Create</button>
      </form>
    </div>
  )
}

export default NewProject