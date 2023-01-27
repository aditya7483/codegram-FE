import { Helmet } from 'react-helmet';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from "./ProjectView.module.css";
import { useSearchParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Navigate, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CoderContainer from "../../../Components/CoderContainer/CoderContainer";
import Request from './../../../Components/Request/Request'
import DefaultMessage from '../../../Components/DefaultMessage/DefaultMessage';
import { authenticateUser } from '../../../Common-Resources';
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
  const [members, setMembers] = useState([]);
  const [join, setJoin] = useState({
    text: 'Join',
    color: 'primary'
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState({
    delete: false,
    join: false
  });
  const [edit, setEdit] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [works_on, setWorks_on] = useState(false);
  const nav = useNavigate()
  let authUsername = null;

  axios.defaults.baseURL = 'https://codegram-be.vercel.app/api';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  const AUTH = window.localStorage.getItem('auth-token');
  if (AUTH && AUTH !== undefined && AUTH.length > 0) {
    axios.defaults.headers.common['auth-token'] = AUTH;
  }

  const fetchAdditionalData = async () => {
    try {
      const mems = await axios.get(`project/members/${searchParams.get('pid')}`)
      setMembers([...mems.data])
      const requests = await axios.get(`project/requests/${searchParams.get('pid')}`)
      setRequests([...requests.data])
      if (requests.data.some((e) => e.username === authUsername.data.username)) {
        setJoin({
          text: 'Requested',
          color: 'secondary'
        })
      }
      if (mems.data.some((e) => e.username === authUsername.data.username)) {
        setWorks_on(true)
      }
    } catch (error) {
      window.alert(`An error occured`)
      // console.log(error)
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`project/filter?pid=${searchParams.get('pid')}`)
      if (res.data[0]) {
        setData({ ...res.data[0] })
      }
      authUsername = await axios.get(`auth/userInfo`)
      fetchAdditionalData(authUsername)

      if (authUsername.data.username === res.data[0].owner_username) {
        console.log(authUsername.data.username === res.data[0].owner_username);
        setIsAdmin(true)
        setWorks_on(true)
      }

    } catch (error) {
      window.alert(`An error occured`)
      // console.log(error)
    }
    setLoading(false)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleJoin = async () => {
    if (join.text === 'Join') {
      setButtonLoading({
        ...buttonLoading,
        join: true
      })
      try {
        const res = await axios.post(`project/createRequest/${searchParams.get('pid')}`)
        setJoin({
          text: 'Requested',
          color: 'secondary'
        })
      } catch (error) {
        window.alert(`An error occured`)
      }
      setButtonLoading({
        ...buttonLoading,
        join: false
      })
    }
  }
  const handleDelete = async () => {
    try {
      setButtonLoading({
        ...buttonLoading,
        delete: true
      })
      const res = await axios.delete(`project/delete/${searchParams.get('pid')}`)
      nav("/project/myProjects")
    } catch (error) {
      window.alert(`An error occured`)
    }
    setButtonLoading({
      ...buttonLoading,
      delete: false
    })
  }


  useEffect(() => {

    if (props.data) {
      setData({ ...props.data })
    }
    else {
      fetchData()
    }

  }, []);

  const handleEdit = () => {
    setEdit(true)
  }
  return (

    <>
      <Helmet>
        <title>CodeGram | Project</title>
      </Helmet>
      {loading ? (
        <CircularProgress color="inherit" className="mx-auto d-block" />
      ) : <>
        <div
          className={`${styles.main_div} d-flex flex-column mx-4 my-4`}
        >

          <div className={`${styles.main_div} d-flex flex-column align-items-center my-4 "border border-success`}>
            <h1 className='text-center my-4'>{data.title}</h1>
            {
              Object.keys(data).map((ele) => {
                return <div className='my-3' key={ele}>
                  <h5 className='text-center my-2 d-inline'>{ele.toUpperCase()} :{" "}</h5>
                  <span className={`${styles.content} `}>{data[ele]}</span>
                </div>
              })
            }
          </div>
        </div>
        <div className='container my-4'>

          {isAdmin ? <div div className="d-flex flex-row m-auto flex-fill">

            <button type="button" className={`btn_prim my-3 mx-3 px-4`} onClick={handleEdit}>
              Edit
            </button>
            {edit && <Navigate to={'/Project/new'} state={{
              fields: {
                name: data.name,
                status: data.status,
                description: data.description,
                domain: data.domain,
                ref_link: DataTransfer.ref_link
              },
              pid: data.pid
            }}
              replace={true}
            />}
            <LoadingButton
              size="small"
              color="error"
              variant="outlined"
              onClick={handleDelete}
              loading={buttonLoading.delete}
              loadingPosition="center"
              className='my-auto'
            >
              <span>Delete</span>
            </LoadingButton>
          </div> :
            !works_on && <LoadingButton
              size="medium"
              color={`${join.color}`}
              onClick={handleJoin}
              loading={buttonLoading.join}
              loadingPosition="center"
              variant="contained"
            >
              <span>{join.text}</span>
            </LoadingButton>
          }
        </div>

        <div className={`${styles.main_div} d-flex flex-column mx-4 my-4`}>
          <Box className={`${styles.display_div}`}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <Tab sx={{ width: "425px" }} label="Users" {...a11yProps(0)} />
                {isAdmin && <Tab sx={{ width: "425px" }} label="Request" {...a11yProps(1)} />}
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {members.map((ele) => {
                return <CoderContainer {...ele} />
              })
              }
            </TabPanel>
            {isAdmin && <TabPanel value={value} index={1}>
              {requests.map((ele) => {
                return <CoderContainer request={true} {...ele} fetchData={fetchAdditionalData} />
              })
              }
            </TabPanel>}
          </Box></div>
      </>}
    </>


  );
}

export default ProjectView