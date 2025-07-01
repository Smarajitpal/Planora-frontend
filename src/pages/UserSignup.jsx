import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAsync } from "../features/User/userSlice";

function UserSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCreate = () => {
    if (!name || !email || !password) {
      alert("Please Fill all the Inputs");
      return;
    } else {
      const data = { name, email, password };
      dispatch(registerUserAsync(data));
      setName("");
      setEmail("");
      setPassword("");
      navigate("/userLogin");
    }
  };
  return (
    <div className="modal show" style={{ display: "block" }}>
      <Modal.Dialog centered>
        <Modal.Header>
          <h3>Register your account</h3>
        </Modal.Header>
        <Modal.Body>
          <label className="mb-2">Name</label>
          <input
            className="form-control mb-4"
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
              Sign Up
            </button>
            <p>
              Already have an account? <Link to="/userLogin">Login</Link>
            </p>
            {status === "error" && (
              <p className="text-danger">Email is already registered</p>
            )}
            {status === "success" && (
              <p className="text-success">User Registered Successfully</p>
            )}
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default UserSignup;
