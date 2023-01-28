import { Helmet } from 'react-helmet';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from "./ProjectView.module.css";
import { useSearchParams } from 'react-router-dom';
import { Backdrop, CircularProgress, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Navigate, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CoderContainer from "../../../Components/CoderContainer/CoderContainer";
import Loading from '../../../Assets/loading-logo.gif'

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
  const [userInfo, setUserInfo] = useState({
    authUsername: ''
  });
  const nav = useNavigate()

  axios.defaults.baseURL = 'https://codegram-be.vercel.app/api';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  const AUTH = window.localStorage.getItem('auth-token');
  if (AUTH && AUTH !== undefined && AUTH.length > 0) {
    axios.defaults.headers.common['auth-token'] = AUTH;
  }

  const fetchAdditionalData = async (authUsername) => {
    try {
      const mems = await axios.get(`project/members/${searchParams.get('pid')}`)
      setMembers([...mems.data])
      const requests = await axios.get(`project/requests/${searchParams.get('pid')}`)
      setRequests([...requests.data])
      if (requests.data.some((e) => e.username === (userInfo.authUsername.length === 0 ? authUsername : userInfo.authUsername))) {
        setJoin({
          text: 'Requested',
          color: 'secondary'
        })
      }
      if (mems.data.some((e) => e.username === (userInfo.authUsername.length === 0 ? authUsername : userInfo.authUsername))) {
        setWorks_on(true)
      }
    } catch (error) {
      window.alert(`An error occured`)
      console.log(error)
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`project/filter?pid=${searchParams.get('pid')}`)
      if (res.data[0]) {
        setData({ ...res.data[0] })
      }
      if (AUTH) {
        const authUsername = (await (axios.get(`auth/userInfo`))).data.username
        setUserInfo({
          ...userInfo,
          authUsername
        })
        fetchAdditionalData(authUsername)
        if (authUsername === res.data[0].owner_username) {
          setIsAdmin(true)
          setWorks_on(true)
        }
      }
      else {
        const mems = await axios.get(`project/members/${searchParams.get('pid')}`)
        setMembers([...mems.data])
      }

    } catch (error) {
      window.alert(`An error occured`)
      console.log(error)
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
      <Backdrop
        sx={{ color: '#040815', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        // open={true}
        open={loading}
      >
        {/* <CircularProgress color="inherit" /> */}
        <img src={Loading} alt="" className={styles.loading} />
      </Backdrop>
      <>
        <div
          className={`${styles.main_div} d-flex flex-row justify-content-between`}
        >

          <div className={`${styles.profile_div}`}>
            <div className={`${styles.main_div} d-flex flex-column align-items-center my-4 "border border-success`}>
              <div
                className={`${styles.user_profile_pic} mt-2 mb-4 `}
                style={{
                  backgroundImage: `url("https://api.dicebear.com/5.x/identicon/svg?seed=${data.pid}")`,
                  backgroundRepeat: "no-repeat",
                  border: `1px solid #ccdbe3`
                }}
              ></div>
              <Box className={styles.view_userinfo}>
                <Typography color="#8400fd" className={`${styles.username}`}>
                  #{data.pid}
                </Typography>
                <Typography color="#8400fd" className={styles.username}>
                  {data.name}
                </Typography>
              </Box>
            </div>
            {isAdmin ? <div div className="d-flex flex-row m-auto flex-fill justify-content-center">

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
              AUTH && !works_on && (data.status !== 'Finished' || data.status !== 'Closed') && <LoadingButton
                size="medium"
                color={`${join.color}`}
                onClick={handleJoin}
                loading={buttonLoading.join}
                loadingPosition="center"
                variant="outlined"
                className={`mx-auto d-block`}
              >
                <span>{join.text}</span>
              </LoadingButton>
            }
          </div>
          <div className={`${styles.details_container}`}>
            {
              Object.keys(data).map((ele) => {
                if (ele !== 'pid' && ele !== 'name' && data[ele]?.length > 0) {
                  return <div className='my-5' key={ele}>
                    <h5 className='text-center my-2 d-inline'>{ele.toUpperCase()} :{" "}</h5>
                    <span className={`${styles.content} `}>{data[ele]}</span>
                  </div>
                }
              })
            }
          </div>
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
                return <CoderContainer request={true} {...ele} fetchData={fetchData} />
              })
              }
            </TabPanel>}
          </Box></div>
      </>
    </>


  );
}

export default ProjectView