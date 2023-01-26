import { Helmet } from 'react-helmet';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from "./ProjectView.module.css";
import { useSearchParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CoderContainer from "../../../Components/CoderContainer/CoderContainer";
import Request from './../../../Components/Request/Request'
import DefaultMessage from '../../../Components/DefaultMessage/DefaultMessage';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box component={'div'} sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
} TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function ProjectView(props) {
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  axios.defaults.baseURL = 'https://codegram-be.vercel.app/api';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  const AUTH = window.localStorage.getItem('auth-token');
  if (AUTH && AUTH !== undefined && AUTH.length > 0) {
    axios.defaults.headers.common['auth-token'] = AUTH;
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`project/filter?pid=${searchParams.get('pid')}`)
      console.log(res);
      setData({ ...res.data[0] })
    } catch (error) {
      window.alert(`An error occured`)
    }
    setLoading(false)
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {

    if (props.data) {
      setData({ ...props.data })
    }
    else {
      fetchData()
    }

  }, []);
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/Project/new");
  }
  return (

    <>
      <Helmet>
        <title>CodeGram | Project</title>
      </Helmet>
      {!loading && <>  
      <div
        className={`${styles.main_div} d-flex flex-column mx-4 my-4`}
      >
        <h1 className='text-center my-4'>{data.title}</h1>
        {loading ? (
          <CircularProgress color="inherit" className="mx-auto d-block" />
        ) : data.length === 0 ? (
          <div className="d-flex flex-column align-items-center my-4">
            <DefaultMessage/>
           </div>
        ) :
          Object.keys(data).map((ele) => {
            return <div className='my-3 ' key={ele}>
              <h5 className='text-center mx-2 my-2 d-inline'>{ele.toUpperCase()} :{" "}</h5>
              <div className={`${styles.content} mx-2`}>
                <span >{data[ele]}</span></div>
            </div>

          }) 
        }
        <div div className="d-flex flex-row m-auto flex-fill">
        <button type="button" className={`${styles.submit_btn} btn_prim my-3 mx-2`} onClick={handleEdit}>Edit</button>
        <button type="button" className={`${styles.submit_btn} btn_prim my-3 mx-2`} >Delete</button></div>
    </div>
      <div className={`${styles.main_div} d-flex flex-column mx-4 my-4`}>
        <Box className={`${styles.display_div}`}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab  sx={{ width: "425px" }} label="Users" {...a11yProps(0)} />
          <Tab  sx={{ width: "425px" }} label="Request" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <CoderContainer/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Request/>
      </TabPanel>
      </Box></div>
      </>}
      </>
    
      
  );
}

export default ProjectView