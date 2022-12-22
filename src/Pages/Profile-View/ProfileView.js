import React from "react";
import "./ProfileView.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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
const ProfileView = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="user-profile-banner">
       
        <div className="user-profile-container">
          <div className="user-profile-pic"></div>
          <div className="view-username">
            <h4>Username#1234</h4>
            <h4>location</h4>
          </div>
        </div>
      </div>
      {/* <div className="container"> */}
      <div className="user-container">
      <div className="user">
        {/* <div className='user-container'> */}
        {/* <div className="user-details"> */}

        {/* <div className='edit-profile-button'>
        <button> Edit Profile</button>
        </div> */}
        {/* <div className="details">
              <h3>university</h3>
              <h3>URL</h3>
              <h3>Skills</h3>
            </div> */}
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
        </Card>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Overview" {...a11yProps(0)} />
              <Tab label="Social" {...a11yProps(1)} />
              <Tab label="Activity" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            Overview
          </TabPanel>
          <TabPanel value={value} index={1}>
            Social
          </TabPanel>
          <TabPanel value={value} index={2}>
            Activity
          </TabPanel>
        </Box>
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
      </div>
      <Card sx={{ minWidth: 175 , m: 2}}  >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProfileView;
