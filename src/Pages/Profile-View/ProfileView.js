import React from "react";
import styles from "./ProfileView.module.css";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import profile from "../../Assets/identicon.png";
import { useNavigate } from "react-router-dom";
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
const ProfileView = (props) => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSetting = () => {
    navigate("/ProfileSetting");
  };
  return (
    <>
      <div className={styles.user_page}>
        <Box className={styles.user_profile_container}>
          <Box
            className={styles.user_profile_pic}
            style={{
              backgroundImage: `url("https://avatars.dicebear.com/api/initials/.svg")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></Box>
          <Box className={styles.view_userinfo}>
            <Typography sx={{ fontSize: 14 }} color="#8400fd" gutterBottom>
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
          </Box>
        </Box>
        <div className={` ${styles.user_container}`}>
          <div className={styles.user_data}>
            <Card sx={{ minWidth: 300, m: 2, height: 80, square: true }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="#8400fd" gutterBottom>
                  About Me
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 300, m: 2, square: true, height: 80 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="#8400fd" gutterBottom>
                  Skills
                </Typography>
                <Typography
                  sx={{ mb: 1.5 }}
                  color="text.secondary"
                ></Typography>
                <Typography variant="body2">
                  <br />
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ minWidth: 300, square: true, m: 2, height: 80 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="#8400fd" gutterBottom>
                  Teams
                </Typography>
                <Typography
                  sx={{ mb: 1.5 }}
                  color="text.secondary"
                ></Typography>
                <Typography variant="body2">
                  <br />
                </Typography>
              </CardContent>
            </Card>
          </div>
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
    </>
  );
};

export default ProfileView;
