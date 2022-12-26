
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Landing from "./Pages/Landing/Landing";
import Navbar from "./Components/Navbar/Navbar";
import './root.css'


const App = () => {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App