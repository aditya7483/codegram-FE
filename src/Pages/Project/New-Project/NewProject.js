import React, { useEffect, useState } from "react";
import styles from "./NewProject.module.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import inputData from "../../../Common-Resources/inputData.json";
import axios from 'axios'
import { redirect } from 'react-router-dom'
import { Backdrop, CircularProgress } from "@mui/material";

const NewProject = () => {
  const [fields, setFields] = useState({
    name: '',
    description: '',
    domain: '',
    status: '',
    ref_link: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(fields)
    setLoading(true)
    if (fields.domain.length === 0) {
      setError('All fields are required')
    }
    else {
      try {
        const res = await axios.post('/project/new', {
          ...fields
        });
        console.log(res)
      } catch (error) {
        setError((error.response.data.err || 'An error occurred'))
      }
    }
    setLoading(false)
  };

  return (
    <div
      className={`${styles.main_div} d-flex flex-column align-items-center my-4`}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <h2 className={`${styles.heading} text-center mb-3`}>
        Create New Project
      </h2>
      <form className={`${styles.form_div} my-2 d-flex flex-column`}>
        {error.length !== 0 && <div className="alert alert-danger" role="alert">
          {error}
        </div>

        }
        <TextField
          id="standard-basic"
          required={true}
          className="my-4"
          label="Project Name"
          variant="standard"
          value={fields.name}
          onChange={(e) => {
            setFields({
              ...fields,
              name: e.target.value
            })
          }}
          name="name"
        />

        <Autocomplete
          disableClearable
          clearOnEscape
          id="combo-box-1"
          className="mb-4"
          options={inputData.projectDomains.data}
          // multiple
          onChange={(e, val) => {
            setFields({
              ...fields,
              domain: val
            })
          }}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Project Domain" />
          )}
        />
        <TextField
          id="standard-basic"
          required={true}
          className="mb-4"
          name="ref_link"
          onChange={(e) => {
            setFields({
              ...fields,
              ref_link: e.target.value
            })
          }}
          label="Reference links"
          variant="standard"
        />
        <div className="form-floating mt-3">
          <textarea
            value={fields.description}
            onChange={(e) => {
              setFields({
                ...fields,
                description: e.target.value
              })
            }} name='description'
            className="form-control"
            style={{ height: '100px' }}>
          </textarea>
          <label htmlFor="floatingTextarea2">Description</label>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className={`${styles.submit_btn} btn_prim my-3`}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewProject;
