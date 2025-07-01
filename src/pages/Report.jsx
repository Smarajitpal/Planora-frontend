import { useDispatch, useSelector } from "react-redux";
import Nav from "../components/Nav";
import { useEffect } from "react";
import { fetchTasks } from "../features/Task/taskSlice";
import { fetchUser } from "../features/User/userSlice";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { fetchTeams } from "../features/Team/teamSlice";

function Report() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { users } = useSelector((state) => state.users);
  const { teams } = useSelector((state) => state.teams);
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
  );
  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUser());
    dispatch(fetchTeams());
  }, [dispatch]);
  const cTasks =
    tasks?.length > 0
      ? tasks.filter((t) => t.status === "Completed").length
      : 0;
  const pTasks =
    tasks?.length > 0
      ? tasks.filter((t) => t.status === "In Progress").length
      : 0;
  const tTasks =
    tasks?.length > 0 ? tasks.filter((t) => t.status === "To Do").length : 0;
  const bTasks =
    tasks?.length > 0 ? tasks.filter((t) => t.status === "Blocked").length : 0;
  const pieChartData = {
    labels: [
      "Completed Tasks",
      "Tasks In Progress",
      "Tasks to be Started",
      "Blocked Tasks",
    ],
    datasets: [
      {
        data: [cTasks, pTasks, tTasks, bTasks],
        backgroundColor: [
          "rgb(2, 143, 75)",
          "rgb(10, 220, 84)",
          "rgba(207, 250, 11, 0.79)",
          "rgb(190, 4, 10)",
        ],
        borderColor: [
          "rgb(27, 41, 192)",
          "rgb(30, 62, 1)",
          "rgb(50, 79, 2)",
          "rgb(133, 3, 3)",
        ],
        borderWidth: 2,
      },
    ],
  };
  const owners = users?.length > 0 ? users?.map((u) => u.name) : [];
  const tasksCompletedByOwners =
    users.length > 0 && users.length > 0
      ? users?.map(
          (user) =>
            tasks?.filter(
              (task) =>
                task.owners?.some((owner) => owner._id === user._id) &&
                task.status === "Completed"
            ).length
        )
      : [];
  const barChartData = {
    labels: owners,
    datasets: [
      {
        label: "Tasks Completed By Owners",
        data: tasksCompletedByOwners,
        backgroundColor: ["rgb(98, 183, 127)"],
        borderColor: ["rgb(2, 24, 14)"],
        borderWidth: 1,
      },
    ],
  };

  const allTeams = teams?.length > 0 ? teams.map((t) => t.name) : [];
  const tasksCompletedByTeams =
    teams?.length > 0 && tasks?.length > 0
      ? teams?.map(
          (team) =>
            tasks?.filter(
              (task) =>
                task.team._id === team._id && task.status === "Completed"
            ).length
        )
      : [];
  const barChartData2 = {
    labels: allTeams,
    datasets: [
      {
        label: "Tasks Completed By Teams",
        data: tasksCompletedByTeams,
        backgroundColor: ["rgb(177, 226, 17)"],
        borderColor: ["rgb(2, 24, 14)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <Nav />
        <div className="col-md-10">
          <h1 className="mt-4">Report</h1>
          <h3 className="my-5">Total Task Distribution</h3>
          <Pie data={pieChartData} />
          <h3 className="my-5">Tasks Completed By Owners</h3>
          <Bar data={barChartData} />
          <h3 className="my-5">Tasks Completed By Teams</h3>
          <Bar data={barChartData2} />
        </div>
      </div>
    </div>
  );
}

export default Report;
