import React, { useEffect, useState } from "react";
import styles from "./ProfileView.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from 'prop-types';
import ProjectContainer from "../../Components/ProjectContainer/ProjectContainer";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Groups2Icon from '@mui/icons-material/Groups2';
import { Helmet } from 'react-helmet';
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { Backdrop } from "@mui/material";
import Loading from '../../Assets/loading-logo.gif'
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
const ProfileView = (props) => {
  const [value, setValue] = React.useState(0);
  const [count, setCount] = useState(0);
  const [follow, setfollow] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [usersInfo, setUsersInfo] = useState({
    authUsername: '',
    username: ''
  });
  const loc = useLocation()
  axios.defaults.baseURL = 'https://codegram-be.vercel.app/api';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  const AUTH = window.localStorage.getItem('auth-token');
  if (AUTH && AUTH !== undefined && AUTH.length > 0) {
    axios.defaults.headers.common["auth-token"] = AUTH;
  }

  const handleFollow = async () => {
    setButtonLoading(true)
    try {
      if (follow === 1) {
        await axios.delete(`follow/unfollow/${usersInfo.username}`)
        setCount(count - 1);
        setfollow(0);
      }
      else {
        console.log(usersInfo.authUsername)
        console.log(usersInfo.username);
        const res = await axios.post(`follow/new`, {
          username: usersInfo.username,
          follower: usersInfo.authUsername
        })
        setfollow(1);
        setCount(count + 1);
        console.log(res)
      }
    }
    catch (err) {
      // window.alert("An error occured")
      console.log(err)
    }
    setButtonLoading(false)
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const uname = searchParams.get("username")
      const authUser = (await axios.get(`auth/userInfo`)).data.username
      if (authUser === uname) {
        setIsAdmin(true)
      }
      const res = await axios.post(`project/filter?owner_username=${uname}`)
      const sk = await axios.get(`user/skills/${uname}`)
      const foll = await axios.get(`follow/find/${uname}`)
      setSkills([...sk.data])
      setData([...res.data])
      setCount(foll.data.length)
      if (foll.data.some((e) => e.follower === authUser)) {
        setfollow(1)
      }
      else {
        setfollow(0)
      }
      setUsersInfo({
        ...usersInfo,
        username: uname,
        authUsername: authUser
      })
    } catch (error) {
      window.alert(`An error occured`)
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    if (!searchParams.get("username")) {
      searchParams.set("username", `${loc.state?.username}`)
      const url = new URL(window.location);
      url.searchParams.set(`${'username'}`, `${loc.state?.username}`);
      window.history.pushState({}, '', url)
    }
    fetchData()
  }, []);

  return (
    <>
      <Helmet>
        <title>CodeGram | Profile</title>
      </Helmet>
      <Backdrop
        sx={{ color: '#040815', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        {/* <CircularProgress color="inherit" /> */}
        <img src={Loading} alt="" />
      </Backdrop>
      <div className={`${styles.user_page} container mt-4`}>
        <Box className={`${styles.user_profile_container} container mt-4`}>
          <div
            className={`${styles.user_profile_pic} mt-2 mb-4 `}
            style={{
              backgroundImage: `url("https://api.dicebear.com/5.x/pixel-art/svg?seed=${loc.state?.username}")`,
              backgroundRepeat: "no-repeat",
              border: `1px solid #ccdbe3`
            }}
          ></div>
          <Box className={styles.view_userinfo}>
            <Typography color="#8400fd" className={styles.username}>
              @{loc.state?.username || usersInfo.username}
            </Typography>
          </Box>
          <Box>
            {/* <button
              type="button"
              className={`${styles.submit_btn} btn_prim my-3`}
              onClick={handleSetting}
            >
              Set Profile
            </button> */}
            {!isAdmin && <LoadingButton
              color="primary"
              variant="outlined"
              className={`my-3 mx-2`}
              onClick={handleFollow}
              loading={buttonLoading}
              loadingPosition="center"
            >
              {follow === 0 ? "Follow" : "Unfollow"}
            </LoadingButton>}
          </Box>
          <Box className={`${styles.skills} container mt-3`}>
            <Box className={`${styles.followbox} d-flex mb-3`}>
              <Groups2Icon /> <div className="d-flex flex-row flex-fill mx-2">
                {count} followers
              </div>
            </Box>
            {skills.length > 0 &&
              <><Typography>Skills</Typography>
                <Stack direction="row" className="flex-wrap" spacing={1}>
                  {skills.map((ele) => {
                    return <Chip
                      className="m-2"
                      label={ele.skill}
                    />
                  })}
                </Stack>
              </>
            }
          </Box>
        </Box>
        <div className={` container mt-3`}>
          <Box sx={{ width: '75%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <Tab label="Projects" {...a11yProps(0)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {data.map((ele) => {
                return <ProjectContainer {...ele} />
              })}
            </TabPanel>
          </Box>
        </div>
      </div>
    </>
  );
};

export default ProfileView;