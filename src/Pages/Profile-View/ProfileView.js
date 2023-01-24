import React, { useState } from "react";
import styles from "./ProfileView.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from 'prop-types';
import ProjectContainer from "../../Components/ProjectContainer/ProjectContainer";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Groups2Icon from '@mui/icons-material/Groups2';
import Request from './../../Components/Request/Request'
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
}TabPanel.propTypes = {
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
  const [count,setCount]=useState(0);
  const [follow,setfollow]=useState(0);
  const navigate = useNavigate();
  const handleFollow=()=>{    
    if(follow===1){
      setCount(count-1);
      setfollow(0);
    }
    else{
      setfollow(1);
      setCount(count+1);
    }
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSetting = () => {
    navigate("/ProfileSetting");
  };
  return (
    <>
    <Helmet>
        <title>CodeGram | Profile</title>
      </Helmet>
      <div className={`${styles.user_page} container mt-4`}>
        <Box className={`${styles.user_profile_container} container mt-4`}>
         <div
                className={`${styles.user_profile_pic} mt-2 mb-4 `}
                style={{
                  backgroundImage: `url("https://avatars.dicebear.com/api/initials/.svg")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div> 
          <Box className={styles.view_userinfo}>
            <Typography sx={{ fontSize: 14 }} color="#8400fd" >
              Username#1234
            </Typography>
          </Box>
          <Box>
            <button
              type="button"
              className={`${styles.submit_btn} btn_prim my-3`}
              onClick={handleSetting}
            >
              Set Profile
            </button>
            <button
              type="button"
              className={`${styles.submit_btn} btn_prim my-3 mx-2`}
              onClick={handleFollow}
            >
              {follow===0?"Follow":"Unfollow"}
            </button>
          </Box>
          <Box className={`${styles.skills} container mt-3`}>
                <Box className={`${styles.followbox} d-flex mb-3`}>
                 <Groups2Icon/> <Typography className="d-flex flex-row flex-fill mx-2">
                  {count} followers.{} following
                  </Typography>
                </Box>
            <Typography>Skills</Typography>
          <Stack direction="row" className="flex-wrap" spacing={1}>    
                 <Chip
                 className="m-2"
                 label={"c++ "}        
                 />  
                  <Chip
                 className="m-2"
                 label={"c# "}        
                 /> 
              </Stack>
          </Box>
        </Box>
      <div className={` container mt-3`}>          
        <Box sx={{ width: '80%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Ongoing" {...a11yProps(1)} />
          <Tab label="Closed" {...a11yProps(2)} />
          <Tab label="completed" {...a11yProps(3)} />
          <Tab label="Request" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <ProjectContainer title={"ProjectTitle"} desc={"Project based on react.js"}  skills={"C++"}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <ProjectContainer title={"ProjectOngoing"} desc={"Project based on react.js"} skills={"C++"}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <ProjectContainer title={"ProjectClosed"} desc={"Project based on react.js"} skills={"C++"}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <ProjectContainer title={"ProjectCompleted"} desc={"Project based on react.js"} skills={"C++"}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Request/>
      </TabPanel>
      </Box>
      </div>
      </div>
    </>
  );
};

export default ProfileView;