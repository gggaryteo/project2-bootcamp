import "./App.css";
import LoginPage from "./Pages/Login/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup/SignupPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import TaskCard from "./Pages/TaskCard/TaskCard";
import CreateProject from "./Pages/CreateProject/CreateProject";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <>
          {user && <Sidebar /> }
          <div className="container">
            <Navbar />
            <Routes>
              <Route exact path="/" element={user ? <Dashboard /> : <Navigate to="/login"/>} />
              <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>} />
              <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/"/>} />
              <Route path="/taskcards/:id" element={user ? <TaskCard /> : <Navigate to="/login"/>} />
              <Route path="/create-project" element={user ? <CreateProject /> : <Navigate to="/login"/>} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
