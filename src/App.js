import logo from "./logo.svg";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/LoginPage";
import Signup from "./Pages/Signup/SignupPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import TaskCard from "./Pages/TaskCard/TaskCard";

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/taskcard">Task Card</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/taskcard" element={<TaskCard />} />
      </Routes>
    </div>
  );
}

export default App;
