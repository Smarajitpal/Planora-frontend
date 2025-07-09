import Modal from "react-bootstrap/Modal";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAsync } from "../features/User/userSlice";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.users);

  const handleCreate = () => {
    if (!email || !password) {
      alert("Please Enter Email and Password");
    } else {
      const loginData = { email, password };
      dispatch(userLoginAsync(loginData));
    }
  };
  useEffect(() => {
    if (status === "success") {
      setEmail("");
      setPassword("");
    }

    if (status === "error" && error === "Request failed with status code 401") {
      setPassword("");
    }

    if (status === "error" && error === "Request failed with status code 404") {
      setEmail("");
      setPassword("");
    }
  }, [status, error]);

  return (
    <div className="modal show" style={{ display: "block" }}>
      <Modal.Dialog centered>
        <Modal.Header>
          <h3>Log in to your account</h3>
        </Modal.Header>
        <Modal.Body>
          <label className="mb-2">Email</label>
          <input
            className="form-control mb-4"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="mb-2">Password</label>
          <input
            className="form-control mb-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="d-grid gap-2 col-7 mx-auto">
            <button className="btn btn-primary" onClick={handleCreate}>
              Login
            </button>
            <p>
              Don't have an account? <Link to="/userSignup">Register</Link>
            </p>
            {status === "success" && (
              <p className="text-success">
                Login Successful <Link to="/">Back to Dashboard</Link>
              </p>
            )}

            {status === "error" &&
              error === "Request failed with status code 401" && (
                <p className="text-danger">Incorrect Password</p>
              )}

            {status === "error" &&
              error === "Request failed with status code 404" && (
                <p className="text-danger">
                  User does not exist. Please register
                </p>
              )}
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default UserLogin;
