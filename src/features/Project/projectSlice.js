import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await axios.get(
      "https://planora-backend-lime.vercel.app/projects"
    );
    return response.data;
  }
);

export const addProjectAsync = createAsyncThunk(
  "projects/addProjectAsync",
  async (proData) => {
    const response = await axios.post(
      "https://planora-backend-lime.vercel.app/projects",
      proData
    );
    return response.data;
  }
);

export const deleteProjectAsync = createAsyncThunk(
  "projects/deleteProjectAsync",
  async (proId) => {
    await axios.delete(
      `https://planora-backend-lime.vercel.app/projects/${proId}`
    );
    return proId;
  }
);

export const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state, action) => {
      state.projects = [];
      state.status = "loading";
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.status = "success";
      state.projects = action.payload;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(addProjectAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addProjectAsync.fulfilled, (state, action) => {
      state.status = "success";
      if (Array.isArray(state.projects)) {
        state.projects.push(action.payload);
      } else {
        state.projects = [action.payload];
      }
    });
    builder.addCase(addProjectAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(deleteProjectAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteProjectAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.projects = state.projects.filter(
        (project) => project._id !== action.payload
      );
    });
    builder.addCase(deleteProjectAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});
