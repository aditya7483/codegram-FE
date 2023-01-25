import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProjectContainer from "../../Components/ProjectContainer/ProjectContainer";
import CoderContainer from "../../Components/CoderContainer/CoderContainer";
import Filter from "../../Components/Filter/Filter";
import './Search.css'
import { Helmet } from 'react-helmet';
import axios from "axios";
import { CircularProgress } from "@mui/material";

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
}

TabPanel.propTypes = {
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

function Search() {
  const [value, setValue] = React.useState(0);
  const [selected, setSelected] = useState('project')
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(
    () => {
      setloading(true)
      axios.defaults.baseURL = 'https://codegram-be.vercel.app/api';
      axios.defaults.headers.post['Content-Type'] = 'application/json';
      const AUTH = window.localStorage.getItem('auth-token');
      if (AUTH && AUTH !== undefined && AUTH.length > 0) {
        axios.defaults.headers.common['auth-token'] = AUTH;
      }
      (async () => {
        try {
          const res = await axios.get(`project/filter`)
          setData([...res.data])
        } catch (error) {
          window.alert(`An error occured`)
          console.log(error)
        }
      })()
      setloading(false)
    }
    , []
  )

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    if (selected === 'project') {
      setSelected('user');

    }
    else {
      setSelected('project');
    }
  };

  return (
    <>
    <Helmet>
        <title>CodeGram | Search</title>
      </Helmet>
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
          <Filter selected={selected} />
        </form>
      </div>
      <Box className={`${styles.sub_div} container d-flex flex-column flex-fill mt-3 `}>
        <Box className={`${styles.display_div}`}>

          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab sx={{ width: "425px" }} label="Project" {...a11yProps(0)} />
              <Tab sx={{ width: "425px" }} label="Coders" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {loading && <CircularProgress color="inherit" className="mx-auto d-block" />}
            {/* <!-- List of Project --> */}
            {
              data.map((ele) => {
                return <ProjectContainer {...ele} />
              })
            }

          </TabPanel>
          <TabPanel value={value} index={1}>
            {loading && <CircularProgress color="inherit" className="mx-auto d-block" />}
            {/* <!-- List of Coders --> */}
            {
              data.map((ele) => {
                return <CoderContainer {...ele} />
              })
            }
          </TabPanel>
        </Box>
      </Box>
    </>
  );
}

export default Search;
