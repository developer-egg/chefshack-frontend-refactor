import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import "./css/custom.css"
import AppNavbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Recipes from "./pages/Recipes";
import IndividualRecipe from "./pages/IndividualRecipe";
import CreateRecipe from "./pages/CreateRecipe";

const App = () => {
  return (
    <Router>
      <AppNavbar/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/create" element={<CreateRecipe/>} />
        <Route path="/recipes" element={<Recipes/>}/>
        <Route path="/recipes/:id" element={<IndividualRecipe/>} />
      </Routes>
    </Router>
  );
}

export default App;