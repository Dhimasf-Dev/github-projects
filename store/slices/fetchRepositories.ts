import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { githubApi } from "../../lib/githubApi";
import { RepoState } from "@/app/types/github";

const initialState: RepoState = {
  repositories: [],
  loading: false,
  error: null,
};

export const fetchRepositories = createAsyncThunk(
  "repositories/fetchRepositories",
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await githubApi.get(`/users/${username}/repos`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch repositories");
    }
  }
);

const repositoriesSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.loading = false;
        state.repositories = action.payload;
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default repositoriesSlice.reducer;
