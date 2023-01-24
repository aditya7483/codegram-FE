import React, { useState } from "react";
import styles from "./NewProject.module.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import inputData from "../../../Common-Resources/inputData.json";
import { Helmet } from 'react-helmet';
const NewProject = () => {
  const [projectValues, setProjectValues] = useState([]);
  const [skillsValues, setSkillsValues] = useState([]);
  const onChangeSkills = (event, value) => {
    setSkillsValues(value);
  };
  const onChangeProject = (event, value) => {
    setProjectValues(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <><Helmet>
    <title>CodeGram | Create Project</title>
  </Helmet>
    <div
      className={`${styles.main_div} d-flex flex-column align-items-center my-4`}
    >
      <h2 className={`${styles.heading} text-center mb-3`}>
        Create New Project
      </h2>
      <form className={`${styles.form_div} d-flex flex-column`}>
        <TextField
          id="standard-basic"
          className="my-4"
          label="Project Name"
          variant="standard"
        />
        <Autocomplete
          disableClearable
          clearOnEscape
          id="combo-box-1"
          className="my-4"
          options={inputData.projectDomains.data}
          multiple
          value={projectValues}
          onChange={onChangeProject}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Project Type" />
          )}
        />
        <Autocomplete
          disableClearable
          clearOnEscape
          id="combo-box-2"
          className="my-4"
          options={inputData.skills.data}
          multiple
          value={skillsValues}
          onChange={onChangeSkills}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Project Requirements"
            />
          )}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className={`${styles.submit_btn} btn_prim my-3`}
        >
          Create
        </button>
      </form>
    </div>
    </>
  );
};

export default NewProject;
