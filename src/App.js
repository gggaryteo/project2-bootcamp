import "./App.css";
import Login from "./Pages/Login/LoginPage";
import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup/SignupPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import TaskCard from "./Pages/TaskCard/TaskCard";
import CreateProject from "./Pages/CreateProject/CreateProject";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Dashboard/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/taskcards/:id" element={<TaskCard />} />
        <Route path="/create-project" element={<CreateProject/>}/>
      </Routes>
    </div>
  );
}

export default App;
