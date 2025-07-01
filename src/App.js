import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Team from "./features/Team/Team";
import Project from "./features/Project/Project";
import Report from "./pages/Report";
import TeamDetails from "./pages/TeamDetails";
import Tasks from "./features/Task/Task";
import TaskDetails from "./pages/TaskDetails";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./features/User/userSlice";

function App() {
  const { token, loggedInUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  if (token) {
    localStorage.setItem("token", token);
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(authUser(token));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userSignup" element={<UserSignup />} />
        {loggedInUser.name ? (
          <>
            <Route path="/project" element={<Project />} />
            <Route path="/team" element={<Team />} />
            <Route path="/report" element={<Report />} />
            <Route path="/team/:teamId" element={<TeamDetails />} />
            <Route path="/project/:projectId" element={<Tasks />} />
            <Route path="/tasks/:taskId" element={<TaskDetails />} />
            <Route path="/settings" />
          </>
        ) : (
          <>
            <Route
              path="/project"
              element={<Navigate to="/userLogin" replace />}
            />
            <Route
              path="/team"
              element={<Navigate to="/userLogin" replace />}
            />
            <Route
              path="/report"
              element={<Navigate to="/userLogin" replace />}
            />
            <Route
              path="/settings"
              element={<Navigate to="/userLogin" replace />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
