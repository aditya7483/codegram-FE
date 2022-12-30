import React from "react";
import {
  Box,
  Divider,
  Drawer,
  // IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  // useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  Person2Outlined,
  // ChevronLeft,
  ChevronRightOutlined,
  // HomeOutlined,
  // ShoppingCartOutlined,
  // Groups2Outlined,
  // ReceiptLongOutlined,
  // PublicOutlined,
  // PointOfSaleOutlined,
  // TodayOutlined,
  // CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  // TrendingUpOutlined,
  // PieChartOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "../../Assets/identicon.png"
const navItems = [
  {
    text:"ProfileView",
    icon:<Person2Outlined/>,
  },
  {
    text: "ProfileSetting",
    icon: <AdminPanelSettingsOutlined />,
  },
];
const Sidebarprofile = ({ isSidebarOpen, drawerWidth, setIsSidebarOpen,user }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: "#8400fd",
              boxSixing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            {/* <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    ECOMVISION
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box> */}
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        
                        color:
                          active === lcText
                            ? "#8b949e"
                            : "#8400fd"
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                          active === lcText
                          ? "#8b949e"
                          : "#8400fd"
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: "#8400fd" }}
                >
                  {user}
                </Typography>
                {/* <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography> */}
              </Box>
              <SettingsOutlined
                sx={{
                  color: "#8400fd",
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebarprofile;
