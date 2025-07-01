import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { RiTeamLine } from "react-icons/ri";
import { FaSquarePollVertical } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/User/userSlice";
import { authUser } from "../features/User/userSlice";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [page, setPage] = useState("");
  const { loggedInUser } = useSelector((state) => state.users);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/team")) setPage("team");
    else if (path.includes("/project")) setPage("project");
    else if (path.includes("/report")) setPage("report");
    else if (path.includes("/settings")) setPage("settings");
    else setPage("dashboard");
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(authUser(token));
    }
  }, [location, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/userLogin");
  };
  return (
    <div className="col-md-2 bg-primary-subtle">
      <h2
        type="button"
        className="mb-4 mt-3 fw-bold text-primary text-center fs-1"
        onClick={() => navigate("/")}
      >
        Planora
      </h2>

      <div className="d-flex flex-column">
        <button
          className="btn text-start fs-5 mb-3 text-secondary"
          onClick={() => {
            if (loggedInUser) {
              handleLogout();
            } else {
              navigate("/userLogin");
            }
          }}
        >
          {loggedInUser.name ? (
            `Welcome ${loggedInUser.name}`
          ) : (
            <>
              <FaUserAlt /> User Login
            </>
          )}
        </button>
        <button
          className={`btn text-start fs-5 mb-3 ${
            page === "dashboard" ? "text-primary" : ""
          }`}
          onClick={() => navigate("/")}
        >
          <MdOutlineDashboard /> Dashboard
        </button>
        <button
          className={`btn text-start fs-5 mb-3 ${
            page === "project" ? "text-primary" : ""
          }`}
          onClick={() => navigate("/project")}
        >
          <GrProjects /> Project
        </button>
        <button
          className={`btn text-start fs-5 mb-3 ${
            page === "team" ? "text-primary" : ""
          }`}
          onClick={() => navigate("/team")}
        >
          <RiTeamLine /> Team
        </button>
        <button
          className={`btn text-start fs-5 mb-3 ${
            page === "report" ? "text-primary" : ""
          }`}
          onClick={() => navigate("/report")}
        >
          <FaSquarePollVertical /> Reports
        </button>
        <button
          className={`btn text-start fs-5 mb-3 ${
            page === "settings" ? "text-primary" : ""
          }`}
          onClick={() => navigate("/settings")}
        >
          <IoSettingsOutline /> Settings
        </button>
      </div>
    </div>
  );
}

export default Nav;
