import { GoPlus } from "react-icons/go";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addTeamAsync, fetchTeams } from "./teamSlice";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import Nav from "../../components/Nav";
function Team() {
  const { teams, status, error } = useSelector((state) => state.teams);
  const dispatch = useDispatch();
  const [createTeam, setCreateTeam] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleSave = () => {
    if (!name || !description) {
      alert("Input fields Empty");
      return;
    } else {
      const data = { name, description };
      dispatch(addTeamAsync(data));
      setCreateTeam(false);
      alert("Team Added Successfully!");
      setName("");
      setDescription("");
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <Nav />
        <div className="col-md-10">
          <div className="d-flex justify-content-between mt-5">
            <h1>Teams</h1>
            <button
              className="btn btn-primary my-2"
              onClick={() => setCreateTeam(!createTeam)}
            >
              <GoPlus /> New Team
            </button>
          </div>
          <div>
            {status === "loading" && <Spinner animation="border" />}
            {error && <p className="text-danger">{error.message}</p>}

            {teams && teams.length > 0 ? (
              <div className="row mt-4">
                {teams?.map((t) => (
                  <Link
                    className="link-underline link-underline-opacity-0 col-md-4"
                    key={t._id}
                    to={`/team/${t._id}`}
                  >
                    <div className="card bg-body-tertiary border-0 ps-2 pt-2 mb-3 ">
                      <h4>{t.name}</h4>
                      <p>{t.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <h3 className="text-danger mt-5">Teams Not Available</h3>
            )}
          </div>

          <Modal show={createTeam} onHide={() => setCreateTeam(false)} centered>
            <Modal.Header closeButton>
              <h3>Create New Team</h3>
            </Modal.Header>
            <Modal.Body>
              <label className="mb-2">Team Name</label>
              <input
                className="form-control mb-4"
                type="text"
                placeholder="Enter Team Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="mb-2">Team Description</label>
              <textarea
                className="form-control mb-4"
                type="text"
                placeholder="Enter Team Description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-secondary"
                onClick={() => setCreateTeam(false)}
              >
                Close
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Team;
