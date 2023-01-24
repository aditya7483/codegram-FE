import React, { useState } from "react";
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
            {/* <!-- List of Project --> */}
            <ProjectContainer title={"ProjectTitle"} desc={"Project based on react.js"} skills={"C++"} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* <!-- List of Coders --> */}
            <CoderContainer user={"username"} desc={"Project based on react.js"} skills={"C++"} />
          </TabPanel>
        </Box>
      </Box>
    </>
  );
}

export default Search;
