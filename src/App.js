import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./Pages/Landing/Landing";
import Navbar from "./Components/Navbar/Navbar";
import ProfileView from "./Pages/Profile-View/ProfileView";
import ProfileSetting from "./Pages/Profile-View/ProfileSetting";
import Search from "./Pages/Search/Search";
import "./root.css";
import NewProject from "./Pages/Project/New-Project/NewProject";
import Filter from './Components/Filter/Filter'
import Projectview from "./Pages/Project/Project-View/ProjectView";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/search" element={<Search />} />
        <Route path="/Filter" element={<Filter />} />
        <Route path="/profileSetting" element={<ProfileSetting />} />
        <Route path="/project">
          <Route path="new" element={<NewProject />} />
          <Route path="view" element={<Projectview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
