import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import "./css/custom.css"
import AppNavbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <AppNavbar/>

      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;