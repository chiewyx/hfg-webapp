
import LandingPage from "./LandingPage";
import SignUp from "./SignUp"; 
import Login from "./login"; 
import Home from "./Home";
import WriteReview from "./WriteReview"; 
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/writereview" exact element={<WriteReview />} /> 
      </Routes>
    </div>
  );
}

export default App;
