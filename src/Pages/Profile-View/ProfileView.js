import React from "react";
import styles from "./ProfileView.module.css";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import banner from "../../Assets/84f5533218ae3fbc050349d5d1937d13.jpg";
import profile from "../../Assets/identicon.png";
const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: " #8400fd",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#8400fd",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#8400fd",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);
const ProfileView = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {/* <div
        className={styles.user_profile_banner}
        style={{
          backgroundImage: `url(${banner})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div> */}
      <div className={styles.user_page}>
        <div className={styles.user_profile_container}>
          <div
            className={styles.user_profile_pic}
            style={{
              backgroundImage: `url(${profile})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>

          <div className={styles.view_userinfo}>
            <h5>Username#1234</h5>
          </div>
          <button type="button" className="btn btn-outline-primary" style={{width:"100%"}}>Set Profile</button>
        </div>
        <div className={` ${styles.user_container}`}>
          <div className={styles.user_data}>
            <Card sx={{ minWidth: 100, square: true }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="#8400fd" gutterBottom>
                  About Me
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ Width: 100, mt: 2, square: true, height: 80 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="#8400fd" gutterBottom>
                Skills
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
              <Typography variant="body2">
                <br />
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ Width: 100, mt:2, square: true, height: 100 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="#8400fd" gutterBottom>
                Teams
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
              <Typography variant="body2">
                <br />
              </Typography>
            </CardContent>
          </Card>
      
            <Box sx={{ bgcolor: "#fff", mt: "1rem" }}>
              <AntTabs
                value={value}
                onChange={handleChange}
                aria-label="ant example"
              >
                <AntTab label="Overview" />
                <AntTab value="Activity" label="Activity" />
                <AntTab value="Social" label="Social" />
              </AntTabs>
              <Box sx={{ p: 3 }} />
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileView;
