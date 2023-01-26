import React, { useEffect, useState } from "react";
import styles from "./NewProject.module.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import inputData from "../../../Common-Resources/inputData.json";
import { useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet';

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Backdrop, CircularProgress } from "@mui/material";


const NewProject = (props) => {
  const [fields, setFields] = useState({
    name: '',
    description: '',
    domain: '',
    status: '',
    ref_link: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [edit, setEdit] = useState(false);
  const loc = useLocation()
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (fields.domain.length === 0) {
      setError('All fields are required')
    }
    else {
      try {
        const res = await axios.post('/project/new', {
          ...fields
        });
        nav('/project/myProjects')
      } catch (error) {
        setError((error.response.data.err || 'An error occurred'))
      }
    }
    setLoading(false)
  };
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (fields.domain.length === 0) {
      setError('All fields are required')
    }
    else {
      try {
        const res = await axios.post(`/project/edit/${loc.state.pid}`, {
          ...fields
        });
        nav(-1)
      } catch (error) {
        setError((error.response.data.err || 'An error occurred'))
      }
    }
    setLoading(false)
  };

  useEffect(() => {
    const fields = loc?.state?.fields
    if (fields) {
      setFields({ ...fields })
      setEdit(true)
    }
  }, []);

  return (
    <><Helmet>
      <title>CodeGram | Create Project</title>
    </Helmet>
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
            id="name"
            inputProps={{ maxLength: 20 }}
            value={fields.name}
            margin="normal"
            required={true}
            className="my-4"
            label="Project Name"
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
            value={fields.domain}
            margin="normal"
            onChange={(e, val) => {
              setFields({
                ...fields,
                domain: val
              })
            }}
            renderInput={(params) => (
              <TextField {...params} margin="normal" label="Project Domain" />
            )}
          />
          <Autocomplete
            disableClearable
            clearOnEscape
            id="combo-box-1"
            className="mb-4"
            value={fields.status}
            options={inputData.projectStatus.data}
            margin="normal"
            onChange={(e, val) => {
              setFields({
                ...fields,
                status: val
              })
            }}
            renderInput={(params) => (
              <TextField {...params} margin="normal" label="Project Status" />
            )}
          />
          <TextField
            id="ref_link"
            required={true}
            inputProps={{ maxLength: 100 }}
            value={fields.ref_link}
            className="mb-4"
            name="ref_link"
            onChange={(e) => {
              setFields({
                ...fields,
                ref_link: e.target.value
              })
            }}
            label="Reference links"
            // variant="standard"
            margin="normal"
          />
          <TextField
            className="my-4"
            id="description"
            value={fields.description}
            inputProps={{ maxLength: 250 }}
            label="Project Description"
            onChange={e => setFields({ ...fields, description: e.target.value })}
            margin="normal"
            fullWidth
            multiline
            rows={4}
          />
          {edit ? <button
            type="submit"
            onClick={handleSave}
            className={`${styles.submit_btn} btn_prim my-3`}
          >
            Save Changes
          </button>
            :
            <button
              type="submit"
              onClick={handleSubmit}
              className={`${styles.submit_btn} btn_prim my-3`}
            >
              Create
            </button>}
        </form>
      </div>
    </>
  );
};

export default NewProject;
