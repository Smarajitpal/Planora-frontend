import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addTaskAsync = createAsyncThunk(
  "tasks/addTaskAsync",
  async (data) => {
    const response = await axios.post(
      "https://planora-backend-lime.vercel.app/tasks",
      data
    );
    return response.data;
  }
);
export const fetchTasks = createAsyncThunk(
  "tasks/fetchFilteredTasks",
  async (filters) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await axios.get(
      `https://planora-backend-lime.vercel.app/tasks?${queryParams}`
    );
    return response.data;
  }
);

export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTaskAsync",
  async ({ tId, dataToUpdate }) => {
    const response = await axios.post(
      `https://planora-backend-lime.vercel.app/tasks/${tId}`,
      dataToUpdate
    );
    return response.data;
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTaskAsync",
  async (idToDelete) => {
    await axios.delete(
      `https://planora-backend-lime.vercel.app/tasks/${idToDelete}`
    );
    return idToDelete;
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state, action) => {
      state.tasks = [];
      state.status = "loading";
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = "success";
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(addTaskAsync.fulfilled, (state, action) => {
      if (Array.isArray(state.tasks)) {
        state.tasks.push(action.payload);
      } else {
        state.tasks = [action.payload];
      }
    });
    builder.addCase(updateTaskAsync.fulfilled, (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
    });
    builder.addCase(deleteTaskAsync.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    });
  },
});

export default taskSlice.reducer;
