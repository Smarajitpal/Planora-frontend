import { useState } from "react";
import Nav from "../../components/Nav";
import { GoPlus } from "react-icons/go";
import { FaArrowRightLong } from "react-icons/fa6";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useEffect } from "react";
import { addTaskAsync, fetchTasks } from "./taskSlice";
import Modal from "react-bootstrap/Modal";
import { fetchTeams } from "../Team/teamSlice";
import { fetchUser } from "../User/userSlice";

function Tasks() {
  const [newTask, setNewTask] = useState(false);
  const { tasks, status, error } = useSelector((state) => state.tasks);
  const { teams } = useSelector((state) => state.teams);
  const { users } = useSelector((state) => state.users);
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [project, setProject] = useState({
    name: location?.state?.name,
    id: location?.state?._id,
  });
  const [team, setTeam] = useState("");
  const [owners, setOwners] = useState([]);
  const [tags, setTags] = useState([]);
  const [taskStatus, setTaskStatus] = useState("");
  const [timeToComplete, setTimeToComplete] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const filterTeam = searchParams.get("team") || "";
  const filterOwner = searchParams.get("owners") || "";
  const filterStatus = searchParams.get("status") || "";

  const handleCreate = () => {
    if (
      !task ||
      !team ||
      !owners.length ||
      !tags ||
      !taskStatus ||
      !timeToComplete
    ) {
      alert("Input Fields Empty");
      return;
    } else {
      const data = {
        name: task,
        project: project.id,
        team,
        owners,
        tags,
        timeToComplete,
        status: taskStatus,
      };
      dispatch(addTaskAsync(data));
      setNewTask(false);
      alert("New Task Added Successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }

    setTask("");
    setTeam("");
    setOwners([]);
    setTags([]);
    setTimeToComplete();
    setTaskStatus("");
  };

  useEffect(() => {
    dispatch(
      fetchTasks({
        project: projectId,
        team: filterTeam,
        owners: filterOwner,
        status: filterStatus,
      })
    );
    dispatch(fetchTeams());
    dispatch(fetchUser());
  }, [dispatch, projectId, filterTeam, filterOwner, filterStatus]);
  return (
    <div className="container mt-5">
      <div className="row">
        <Nav />
        <div className="col-md-10">
          <div className="d-flex justify-content-between mt-5">
            <h1>{location?.state?.name}</h1>
            <button
              className="btn btn-primary my-2"
              onClick={() => setNewTask(!newTask)}
            >
              <GoPlus /> New Task
            </button>
          </div>
          <div>
            <div className="d-flex mt-4">
              <h3>Filters: </h3>
              <select
                className="form-select ms-3"
                name="team"
                value={filterTeam}
                onChange={(e) =>
                  setSearchParams({
                    team: e.target.value,
                    owners: filterOwner,
                    status: filterStatus,
                  })
                }
              >
                <option value="">Select a team</option>
                {teams?.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <select
                className="form-select ms-3"
                name="owners"
                value={filterOwner}
                onChange={(e) =>
                  setSearchParams({
                    team: filterTeam,
                    owners: e.target.value,
                    status: filterStatus,
                  })
                }
              >
                <option value="">Select an owner</option>
                {users?.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
              </select>
              <select
                className="form-select ms-3"
                name="status"
                value={filterStatus}
                onChange={(e) =>
                  setSearchParams({
                    team: filterTeam,
                    owners: filterOwner,
                    status: e.target.value,
                  })
                }
              >
                <option value="">Select status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
              </select>
              <button
                className="btn btn-danger ms-3"
                onClick={() => setSearchParams({})}
              >
                Clear
              </button>
            </div>

            {status === "loading" && <Spinner animation="border" />}
            {error && <p className="text-danger">{error.message}</p>}
            {tasks.length > 0 ? (
              <div className="mt-4">
                <Table>
                  <thead>
                    <tr>
                      <th className="bg-info-subtle">Tasks</th>
                      <th className="bg-info-subtle">Owners</th>
                      <th className="bg-info-subtle">Time to Complete</th>
                      <th className="bg-info-subtle">Status</th>
                      <th className="bg-info-subtle"></th>
                    </tr>
                  </thead>
                  <tbody className="border-1">
                    {tasks?.map((t) => (
                      <tr key={t._id}>
                        <td className="border-1">
                          <b>{t.name}</b>
                        </td>
                        <td className="border-1">
                          {t.owners.map((o) => (
                            <span
                              key={o._id}
                              className="badge bg-secondary me-2"
                            >
                              {o.name}
                            </span>
                          ))}
                        </td>
                        <td className="border-1">
                          {t.timeToComplete} day
                          {t.timeToComplete > 1 ? "s" : ""}
                        </td>
                        <td
                          className={
                            t.status === "Completed"
                              ? "text-success"
                              : t.status === "Blocked"
                              ? "text-danger"
                              : "text-warning"
                          }
                        >
                          {t.status}
                        </td>
                        <td
                          type="btn"
                          className="btn-primary border-1"
                          onClick={() =>
                            navigate(`/tasks/${t._id}`, { state: t })
                          }
                        >
                          <FaArrowRightLong />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <h4 className="mt-5 text-danger">
                No tasks available for "{location?.state?.name}"
              </h4>
            )}
          </div>
          <Modal show={newTask} onHide={() => setNewTask(false)} centered>
            <Modal.Header closeButton>
              <h3>Create New Task | {location?.state?.name}</h3>
            </Modal.Header>
            <Modal.Body>
              <label className="mb-2">Task Name</label>
              <input
                className="form-control mb-4"
                type="text"
                placeholder="Enter Task Name"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <label className="mb-2">Project Name</label>
              <input
                className="form-control mb-4"
                type="text"
                value={project.name}
                onChange={(e) =>
                  setProject({ ...project, name: e.target.value })
                }
              />
              <label className="mb-2">Select Team</label>
              <select
                className="form-select mb-4"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              >
                <option>Select a team</option>
                {teams?.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <label className="mb-2">Select Owners</label>
              <select
                className="form-select mb-4"
                onChange={(e) =>
                  setOwners((prev) =>
                    prev.includes(e.target.value)
                      ? prev
                      : [...prev, e.target.value]
                  )
                }
              >
                <option>Select multiple owner</option>
                {users?.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
              </select>
              <label className="mb-2">Tags</label>
              <input
                className="form-control mb-4"
                type="text"
                placeholder="Enter Multiple Tags"
                value={tags}
                onChange={(e) => setTags(e.target.value.split(","))}
              />
              <label className="mb-2">Estimated Time</label>
              <input
                className="form-control mb-4"
                type="number"
                placeholder="Enter Time in days"
                value={timeToComplete}
                onChange={(e) => setTimeToComplete(e.target.value)}
              />
              <label className="mb-2">Select Status</label>
              <select
                className="form-select mb-4"
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
              >
                <option>Select a Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
              </select>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-secondary"
                onClick={() => setNewTask(false)}
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

export default Tasks;
