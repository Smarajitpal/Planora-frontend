import { configureStore } from "@reduxjs/toolkit";
import { teamSlice } from "../features/Team/teamSlice";
import { userSlice } from "../features/User/userSlice";
import { projectSlice } from "../features/Project/projectSlice";
import { taskSlice } from "../features/Task/taskSlice";

export default configureStore({
  reducer: {
    teams: teamSlice.reducer,
    users: userSlice.reducer,
    projects: projectSlice.reducer,
    tasks: taskSlice.reducer,
  },
});
