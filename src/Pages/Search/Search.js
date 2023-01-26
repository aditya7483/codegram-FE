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
import "./Search.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import DefaultMessage from '../../Components/DefaultMessage/DefaultMessage';

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
        <Box component={"div"} sx={{ p: 3 }}>
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
  const [selected, setSelected] = useState("project");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [domain, setDomain] = useState([]);


  const [filterData, setFilterData] = useState([]);
  axios.defaults.baseURL = 'https://codegram-be.vercel.app/api';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  const AUTH = window.localStorage.getItem('auth-token');

  if (AUTH && AUTH !== undefined && AUTH.length > 0) {
    axios.defaults.headers.common["auth-token"] = AUTH;
  }


  const fetchProjectData = async () => {

    setLoading(true);
    try {
      let url = `project/filter`;
      const name = searchParams.get("name");
      if (name) {
        url += `?name=${name}`;
      }
      console.log(url);
      const res = await axios.post(url, {

        domain: filterData
      })
      setData([...res.data])
    } catch (error) {
      window.alert(`An error occured`)
      console.log(error)
    }

    setLoading(false)
  }
  const fetchUserData = async () => {
    setLoading(true);
    try {
      let url = `user/filter`
      const username = searchParams.get('username')
      if (username) {
        url += `?username=${username}`
      }
      const res = await axios.post(url, {
        skill: filterData
      })
      setData([...res.data])

    } catch (error) {
      window.alert(`An error occured`);
      console.log(error);
    }


    setLoading(false)
  }
  useEffect(
    () => {
      setData([])
      if (value === 0) {
        fetchProjectData()
      }
      else {
        fetchUserData()
      }
    }
    , [filterData]
  )

  const handleSearch = async (e) => {
    e.preventDefault()
    setData([])
    console.log(value)
    searchParams.set(`${value === 0 ? 'name' : 'username'}`, `${e.target[0].value}`)
    const url = new URL(window.location);
    url.searchParams.set(`${value === 0 ? 'name' : 'username'}`, `${e.target[0].value}`);
    window.history.pushState({}, '', url)
    if (value === 0) {
      fetchProjectData()
    }
    else {
      fetchUserData()
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFilterData([])
    setData([])
    window.history.pushState({}, '', window.location.href.split('?')[0])
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
        <form
          className={`${styles.main_div} form-inline my-2 `}
          onSubmit={handleSearch}
        >
          <input
            className={`${styles.formc} form-control mr-sm-2 `}
            type="search"
            placeholder="Search"
            aria-label="Search"
          />

          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Filter selected={selected} filterData={filterData} setFilterData={setFilterData} />
        </form>
      </div>
      <Box
        className={`${styles.sub_div} container d-flex flex-column flex-fill mt-3 `}
      >
        <Box className={`${styles.display_div}`}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab sx={{ width: "425px", fontFamily: "var(--font-primary)", fontWeight: "600", fontSize: "20px" }} label="Project" {...a11yProps(0)} />
              <Tab sx={{ width: "425px", fontFamily: "var(--font-primary)", fontWeight: "600", fontSize: "20px" }} label="Coders" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {/* <!-- List of Project --> */}
            {loading && <CircularProgress color="inherit" className="mx-auto d-block" />}
            {
              data.map((ele) => {
                return <ProjectContainer key={ele.name} {...ele} />;
              })
            }
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* <!-- List of Coders --> */}
            {loading &&
              <CircularProgress color="inherit" className="mx-auto d-block" />
            }
            {data.map((ele) => {
              return <CoderContainer key={ele.name} {...ele} />;
            })
            }
          </TabPanel>
        </Box>
      </Box>
    </>
  );
}

export default Search;
