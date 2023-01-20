import React, { useEffect, useState } from "react";
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
import Globalproject from "./Pages/Project/Global-Project/Globalproject";
import axios from "axios";

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    axios.defaults.baseURL = 'https://codegram-be.vercel.app/api';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    const AUTH = window.localStorage.getItem('auth-token');
    if (AUTH && AUTH !== undefined && AUTH.length > 0) {
      axios.defaults.headers.common['auth-token'] = AUTH;
      setLoggedIn(true)
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/search" element={<Search />} />
        <Route path="/Filter" element={<Filter />} />
        <Route path="/profileSetting" element={<ProfileSetting />} />
        <Route path="/project">
          <Route path="Global" element={<Globalproject />} />
          <Route path="new" element={<NewProject />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
