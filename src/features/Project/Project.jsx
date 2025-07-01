import { useEffect } from "react";
import Nav from "../../components/Nav";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { addProjectAsync, fetchProjects } from "./projectSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

function Project() {
  const { projects, status, error } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const [newProject, setNewProject] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    const projectData = { name: projectName, description };
    if (!projectName || !description) {
      alert("Input Fields Empty");
      return;
    } else {
      dispatch(addProjectAsync(projectData));
      setNewProject(false);
      alert("New Project Created Successfully!");
      setProjectName("");
      setDescription("");
    }
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  return (
    <div className="container mt-5">
      <div className="row">
        <Nav />
        <div className="col-md-10">
          <div className="d-flex justify-content-between mt-5">
            <h1>Projects</h1>
            <button
              className="btn btn-primary my-2"
              onClick={() => setNewProject(!newProject)}
            >
              <GoPlus /> New project
            </button>
          </div>
          <div>
            {status === "loading" && <Spinner animation="border" />}
            {error && <p className="text-danger">{error.message}</p>}

            {projects && projects.length > 0 ? (
              <div className="row mt-4">
                {projects?.map((p) => (
                  <Link
                    className="link-underline link-underline-opacity-0 col-md-4"
                    key={p._id}
                    to={`/project/${p._id}`}
                    state={p}
                  >
                    <div className="card bg-body-tertiary border-0 ps-2 pt-2 mb-3 ">
                      <h4>{p.name}</h4>
                      <p>{p.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <h3 className="text-danger mt-5">Projects Not Available</h3>
            )}
          </div>
          <Modal show={newProject} onHide={() => setNewProject(false)} centered>
            <Modal.Header closeButton>
              <h3>Create New Project</h3>
            </Modal.Header>
            <Modal.Body>
              <label className="mb-2">Project Name</label>
              <input
                className="form-control mb-4"
                type="text"
                placeholder="Enter Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <label className="mb-2">Project Description</label>
              <textarea
                className="form-control mb-4"
                type="text"
                placeholder="Enter Project Description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-secondary"
                onClick={() => setNewProject(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleCreate}>
                Create
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Project;
