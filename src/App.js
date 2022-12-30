import "./App.css";
// import { useState } from "react";
// import Sidebarprofile from "./Pages/Profile-View/Sidebarprofile";
import ProfileView from "./Pages/Profile-View/ProfileView";
// import ProfileSetting from "./Pages/Profile-View/ProfileSetting";
// import { BrowserRouter, Route,Navigate, Routes } from "react-router-dom";
// import Box from "@mui/material/Box";
function App() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <>
    {/* <BrowserRouter>
    <Box width="100%" height="100%">
      <Sidebarprofile
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        drawerWidth="250px"
        user={"abc123"}    
      />
      </Box>
      <Routes>
        <Route path="/" element={<Navigate to="/ProfileView" replace />} />
        <Route path="/ProfileView" element={<ProfileView/>}/>
        <Route path="/ProfileSetting" element={<ProfileSetting />} />
      </Routes>
    </BrowserRouter> */}
    
      <ProfileView/>
    </>
  );
}

export default App;
