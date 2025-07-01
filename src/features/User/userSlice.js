import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  const response = await axios.get(
    "https://planora-backend-lime.vercel.app/users"
  );
  return response.data;
});

export const updateUserAsync = createAsyncThunk(
  "users/updateUserAsync",
  async ({ uId, uData }) => {
    const response = await axios.post(
      `https://planora-backend-lime.vercel.app/users/${uId}`,
      uData
    );
    return response.data;
  }
);

export const registerUserAsync = createAsyncThunk(
  "users/registerUseerAsync",
  async (data) => {
    const response = await axios.post(
      "https://planora-backend-lime.vercel.app/user/signup",
      data
    );
    return response.data;
  }
);

export const userLoginAsync = createAsyncThunk(
  "users/userLoginAsync",
  async (loginData) => {
    const response = await axios.post(
      "https://planora-backend-lime.vercel.app/user/login",
      loginData
    );
    return response.data;
  }
);
export const authUser = createAsyncThunk("users/authUser", async (token) => {
  const response = await axios.get(
    "https://planora-backend-lime.vercel.app/user/me",
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
});

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
    token: "",
    loggedInUser: {},
  },
  reducers: {
    logout: (state) => {
      state.token = "";
      state.loggedInUser = {};
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "success";
      state.users = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
      state.users = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    });
    builder.addCase(registerUserAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(registerUserAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(userLoginAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.token = action.payload.token;
    });
    builder.addCase(userLoginAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(authUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.status = "success";
      state.loggedInUser = action.payload;
    });
    builder.addCase(authUser.rejected, (state, action) => {
      state.status = "error";
      state.loggedInUser = {};
    });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
