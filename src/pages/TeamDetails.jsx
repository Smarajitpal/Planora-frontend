import { useNavigate, useParams } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import Nav from "../components/Nav";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeamAsync, fetchTeams } from "../features/Team/teamSlice";
import { fetchUser, updateUserAsync } from "../features/User/userSlice";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function TeamDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teamId } = useParams();
  const { teams } = useSelector((state) => state.teams);
  const { users } = useSelector((state) => state.users);
  const selectedTeam = teams?.find((t) => t._id === teamId);
  const userList = users?.filter((u) => u.team?._id === teamId);
  const [addMember, setAddMember] = useState(false);
  const [userId, setUserId] = useState("");

  const handleSave = () => {
    const data = { team: teamId };
    const userName = users.find((u) => u._id === userId);
    dispatch(updateUserAsync({ uId: userId, uData: data }));
    setAddMember(false);
    alert(`${userName.name} added to the team.`);
    setUserId("");
    dispatch(fetchUser());
  };
  const handleDelete = () => {
    dispatch(deleteTeamAsync(teamId));
    alert("Team Deleted Successfully!");
    navigate("/team");
  };
  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <div className="container mt-5">
      <div className="row">
        <Nav />
        <div className="col-md-10">
          <button
            className="mt-5 btn text-primary"
            onClick={() => navigate("/team")}
          >
            <FaArrowLeftLong />
            <b> Back to Teams</b>
          </button>
          <h2 className="mt-4">{selectedTeam?.name}</h2>
          <h5 className="text-body-tertiary mt-4">MEMBERS</h5>
          {userList.length > 0 ? (
            <div className="my-3 fs-5">
              {userList.map((u) => (
                <div key={u._id}>{u.name}</div>
              ))}
            </div>
          ) : (
            <h4 className="text-danger mt-3">No User in the Team</h4>
          )}
          <button
            className="btn btn-primary"
            onClick={() => setAddMember(!addMember)}
          >
            <GoPlus /> Member
          </button>
          <button className="btn btn-danger ms-3" onClick={handleDelete}>
            Delete Team
          </button>
        </div>
      </div>
      <Modal show={addMember} onHide={() => setAddMember(false)} centered>
        <Modal.Header closeButton>
          <h3>Add New Member</h3>
        </Modal.Header>
        <Modal.Body>
          <label>Members Name</label>
          <select
            className="mt-3 form-select"
            onChange={(e) => setUserId(e.target.value)}
          >
            <option>Members Name</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setAddMember(false)}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TeamDetails;
