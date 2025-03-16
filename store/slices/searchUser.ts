import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { githubApi } from "../../lib/githubApi";
import { UserState } from "@/app/types/github";

const initialState: UserState = {
  username: null,
  loading: false,
  error: null,
};

export const searchUser = createAsyncThunk(
  "username/searchUser",
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await githubApi.get(`/users/${username}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch username");
    }
  }
);

const userSlice = createSlice({
  name: "username",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload;
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
