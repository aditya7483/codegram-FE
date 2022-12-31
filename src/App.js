import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Landing from "./Pages/Landing/Landing";
import Navbar from "./Components/Navbar/Navbar";
import ProfileView from "./Pages/Profile-View/ProfileView";
import ProfileSetting from "./Pages/Profile-View/ProfileSetting";
import './root.css'


const App = () => {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/ProfileView" element={<ProfileView/>}/>
        <Route path="/ProfileSetting" element={<ProfileSetting />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App