import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteTaskAsync, updateTaskAsync } from "../features/Task/taskSlice";

function TaskDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createdAt = new Date(location?.state?.createdAt);
  const estimatedDueDate = new Date(createdAt);
  estimatedDueDate.setDate(
    createdAt.getDate() + location?.state?.timeToComplete
  );

  const now = new Date();
  const diffTime = estimatedDueDate - now;
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const handleComplete = () => {
    const dataToUpdate = { status: "Completed" };
    const tId = location?.state?._id;
    dispatch(updateTaskAsync({ tId, dataToUpdate }));
    alert("Task Completed");
  };

  const handleDelete = () => {
    const idToDelete = location?.state?._id;
    dispatch(deleteTaskAsync(idToDelete));
    alert("Task Deleted Successfully");
    navigate("/project", { state: location?.state?.project });
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-2">
          <button
            className="mt-5 btn text-primary"
            onClick={() =>
              navigate(`/project/${location?.state?.project._id}`, {
                state: location?.state?.project,
              })
            }
          >
            <FaArrowLeftLong />
            <b> Back to Task</b>
          </button>
        </div>
        <div className="col-md-10">
          <h1>{location?.state?.name}</h1>
          <h3 className="text-secondary mt-4">
            Project Name: {location?.state?.project?.name}
          </h3>
          <h3 className="text-secondary mt-3">
            Team: {location?.state?.team.name}
          </h3>
          <h3 className="text-secondary mt-3">
            Owners: {location?.state?.owners.map((o) => o.name).join(", ")}
          </h3>
          <h3 className="text-secondary mt-3">
            Tags: {location?.state?.tags.join(", ")}
          </h3>
          <h3 className="text-secondary mt-3">
            Due Date: {location?.state?.timeToComplete} day
            {location?.state?.timeToComplete > 1 ? "s" : ""}
          </h3>
          <hr />
          <h3 className="text-secondary mt-3">
            Status:{" "}
            <span
              className={`${
                location?.state?.status === "Completed"
                  ? "text-success"
                  : "text-warning"
              }`}
            >
              {location?.state?.status}
            </span>
          </h3>
          {location?.state?.status !== "Completed" && (
            <h3 className="text-secondary mt-3">
              Time Remaining:{" "}
              {daysLeft > 0 ? (
                <span>
                  {daysLeft} day{daysLeft > 1 ? "s" : ""} left
                </span>
              ) : (
                <span className="text-danger">Overdue</span>
              )}
            </h3>
          )}
          {location?.state?.status !== "Completed" && (
            <button className="mt-3 btn btn-success" onClick={handleComplete}>
              Mark Completed
            </button>
          )}
          <br />
          <button className="mt-3 btn btn-danger" onClick={handleDelete}>
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
