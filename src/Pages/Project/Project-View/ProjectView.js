import React, { useState } from 'react';
import style from "./ProjectView.module.css";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import Autocomplete from "@mui/material/Autocomplete";
// import inputData from "../../../Common-Resources/inputData.json";


function ProjectView()  {
  const [title, setTitle] = useState("My Project");
  const [description, setDescription] = useState("This is a sample project.");
  const [status, setStatus] = useState(" ");
  const [date, setDate] = useState("2021-01-01");
  // const [domain, setDomain] = useState("");
  const [owner, setOwner] = useState("John Doe");
  const [readOnly, setReadOnly] = useState(true);

  const handleUpdate = () => {
    setReadOnly(false);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setReadOnly(true);
  };
  const handleDelete = () => {
    setTitle("");
    setDescription("");
    setStatus("");
    setDate("");
    // setDomain([]);
    setOwner("");
    setReadOnly(true);
  }

  return (
    <div
    className={`${style.main_div} d-flex flex-column align-items-center my-4`}
  >
    <h2 className={`${style.heading} text-center mb-3`}>
       Project
    </h2>
    <form className={`${style.form_div} d-flex flex-column`}>
      
    <TextField className="my-4"
      id="owner" name="owner" label="owner" value={owner} InputProps={{
        readOnly: readOnly,
      }} 
      onChange={e => setOwner(e.target.value)}/>
      <TextField
        id="title"
        className="my-4"
        label="Project Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        InputProps={{
          readOnly: readOnly,
        }}
        margin="normal"
        fullWidth
      />
      <TextField
        className="my-4"
        id="description"
        label="Project Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        InputProps={{
          readOnly: readOnly,
        }}
        margin="normal"
        fullWidth
        multiline
        rows={4}
      />
      <FormControl >
        <InputLabel className="my-4" htmlFor="status">Status</InputLabel>
        <Select
          native
          className="my-4"
          label="status"
          value={status}
          onChange={e => setStatus(e.target.value)}
          inputProps={{
            name: 'status',
            id: 'status',
            readOnly: readOnly,
          }}
        >{/* */}
           <option value=" "></option>
          <option value="ongoing">Ongoing</option>
          <option value="closed">Closed</option>
          <option value="finished">Finished</option>
        </Select>
      </FormControl>
      <TextField
        id="date"
        className="my-4"
        type="date"
        label="Date of Creation"
        value={date}
        onChange={e => setDate(e.target.value)}
        InputProps={{
          readOnly: readOnly,
        }}
        margin="normal"
        fullWidth
      />      
      {/* <Autocomplete
          className="my-4"
          disableClearable
          clearOnEscape
          options={inputData.projectDomains.data}
          multiple 
          id="domain"  value={domain}  
          onChange={e => setDomain(e.target.value)} margin="normal" 
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Project Domain"  InputProps={{
              readOnly: readOnly,
            }} />
          )}
        fullWidth/> */}
         
      <div className="d-flex flex-row flex-fill">  
      <button type="button"  className={`${style.submit_btn} btn_prim my-3 mx-2`} onClick={handleSubmit}>Save</button>
      <button type="button"  className={`${style.submit_btn} btn_prim my-3 mx-2`} onClick={handleUpdate}>Update</button>
      <button type="button"   className={`${style.submit_btn} btn_prim my-3 mx-2`} onClick={handleDelete}>Delete</button></div>
    </form>
    </div>
  );
}
 
export default ProjectView