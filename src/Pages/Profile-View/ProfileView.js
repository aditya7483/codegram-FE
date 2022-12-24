import React from "react";
import styles from "./ProfileView.module.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import banner from "../../Assets/84f5533218ae3fbc050349d5d1937d13.jpg";
import profile from "../../Assets/identicon.png";
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
      <div
        className={styles.user_profile_banner}
        style={{
          backgroundImage: `url(${banner})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={styles.user_profile_container}>
          <div
            className={styles.user_profile_pic}
            style={{
              backgroundImage: `url(${profile})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
          <div className={styles.view_username}>
            <h3>Username#1234</h3>
            <h5>location</h5>
          </div>
        </div>
      </div>
      <div className={styles.div2}>
        <div
          className={styles.user_container}
          style={{ justifyContent: "center" }}
        >
          <div className={styles.user}>
            <Card sx={{ minWidth: 275, square: true }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  About Me
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  -----
                </Typography>
                <Typography variant="body2">
                  -----.
                  <br />
                  {'"------"'}
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
          </div>
          <Card sx={{ minWidth: 175, m: 2, square: true }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Skills/contributors/users
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                ----------
              </Typography>
              <Typography variant="body2">
                ----------
                <br />
                {'"------------"'}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProfileView;
