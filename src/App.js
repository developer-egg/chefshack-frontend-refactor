import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import "./css/custom.css"
import AppNavbar from "./components/Navbar";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <AppNavbar/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;