import { useDispatch, useSelector } from "react-redux";
import Nav from "../components/Nav";
import { useEffect } from "react";
import { fetchTasks } from "../features/Task/taskSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.users);
  const { tasks, status } = useSelector((state) => state.tasks);
  const sample = [
    {
      name: "Sample 1",
      description: "Sample description 1",
      taskName: "Sample Tasks 1",
      status: "In Progress",
    },
    {
      name: "Sample 2",
      description: "Sample description 2",
      taskName: "Sample Tasks 2",
      status: "Completed",
    },
    {
      name: "Sample 3",
      description: "Sample description 3",
      taskName: "Sample Tasks 3",
      status: "To Do",
    },
  ];
  useEffect(() => {
    if (loggedInUser?._id) {
      dispatch(fetchTasks({ owners: loggedInUser._id }));
    }
  }, [dispatch, loggedInUser?._id]);
  return (
    <div className="container mt-5">
      <div className="row">
        <Nav />
        <div className="col-md-10 bg-white">
          <div className="mt-4">
            <h1>Projects</h1>
            {status === "loading" && <Spinner animation="border" />}
            {loggedInUser?.name ? (
              <div className="row">
                {tasks.slice(1, 4).map((t) => (
                  <div className="col-md-4" key={t._id}>
                    <div
                      className="card bg-body-tertiary border-0 px-2 pt-2 mb-3"
                      onClick={() =>
                        navigate(`/project/${t.project._id}`, {
                          state: t.project,
                        })
                      }
                    >
                      <h3>{t.project.name}</h3>
                      <p>{t.project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="row">
                {sample.map((s) => (
                  <div className="col-md-4" key={s.name}>
                    <div
                      className="card bg-body-tertiary border-0 px-2 pt-2 mb-3"
                      onClick={() => navigate("/userLogin")}
                    >
                      <h3>{s.name}</h3>
                      <p>{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-4">
            <h1>My Tasks</h1>
            {status === "loading" && <Spinner animation="border" />}
            {loggedInUser?.name ? (
              <div className="row">
                {tasks.slice(0, 3).map((t) => (
                  <div className="col-md-4" key={t._id}>
                    <div
                      className="card bg-body-tertiary border-0 px-2 py-2 mb-3"
                      onClick={() => navigate(`/tasks/${t._id}`, { state: t })}
                    >
                      <h3>{t.name}</h3>
                      <span
                        className={
                          t.status === "Completed"
                            ? "text-success"
                            : "text-warning"
                        }
                      >
                        {t.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="row">
                {sample.map((s) => (
                  <div className="col-md-4" key={s.name}>
                    <div
                      className="card bg-body-tertiary border-0 px-2 py-2 mb-3"
                      onClick={() => navigate("/userLogin")}
                    >
                      <h3>{s.taskName}</h3>
                      <span
                        className={
                          s.status === "Completed"
                            ? "text-success"
                            : "text-warning"
                        }
                      >
                        {s.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
