
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
import NewProject from "./Pages/Project/New-Project/NewProject";


const App = () => {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/profile" element={<ProfileView />} />
        <Route path="/profileSetting" element={<ProfileSetting />} />
        <Route path="/project">
          <Route path="" element={<Landing />} />
          <Route path="new" element={<NewProject />} />
        </Route>


      </Routes>
    </BrowserRouter>

  );

}

export default App