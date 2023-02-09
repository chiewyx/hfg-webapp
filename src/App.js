
import LandingPage from "./LandingPage";
import SignUp from "./SignUp"; 
import Login from "./login"; 
import Home from "./Home";
import Profile from "./profile"; 
import WriteReview from "./WriteReview"; 
import { Routes, Route } from "react-router-dom";
import "./App.css";
import ReviewPage from "./listReviews";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/profile" exact element={<Profile />} /> 
        <Route path="/writereview" exact element={<WriteReview />} /> 
        <Route path="/listreviews" exact element={<ReviewPage />} /> 
      </Routes>
    </div>
  );
}

export default App;
