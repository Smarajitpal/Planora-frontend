import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeams = createAsyncThunk("teams/fetchTeams", async () => {
  const response = await axios.get(
    "https://planora-backend-lime.vercel.app/teams"
  );
  return response.data;
});

export const addTeamAsync = createAsyncThunk(
  "teams/addTeamAsync",
  async (teamData) => {
    const response = await axios.post(
      "https://planora-backend-lime.vercel.app/teams",
      teamData
    );
    return response.data;
  }
);

export const deleteTeamAsync = createAsyncThunk(
  "teams/deleteTeamAsync",
  async (teamId) => {
    await axios.delete(
      `https://planora-backend-lime.vercel.app/teams/${teamId}`
    );
    return teamId;
  }
);

export const teamSlice = createSlice({
  name: "teams",
  initialState: {
    teams: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeams.pending, (state, action) => {
      state.teams = [];
      state.status = "loading";
    });
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      state.status = "success";
      state.teams = action.payload;
    });
    builder.addCase(fetchTeams.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(addTeamAsync.fulfilled, (state, action) => {
      if (Array.isArray(state.teams)) {
        state.teams.push(action.payload);
      } else {
        state.teams = [action.payload];
      }
    });
    builder.addCase(deleteTeamAsync.fulfilled, (state, action) => {
      state.teams = state.teams.filter((team) => team._id !== action.payload);
    });
  },
});
export default teamSlice.reducer;
