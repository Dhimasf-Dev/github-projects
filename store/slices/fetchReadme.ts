import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { githubApi } from "../../lib/githubApi";
import { ReadmeState } from "@/app/types/github";

const initialState: ReadmeState = {
  content: "",
  loading: false,
  error: null,
};

const decodeBase64 = (base64String: string) => {
  return Buffer.from(base64String, "base64").toString("utf-8");
};

export const fetchReadme = createAsyncThunk(
  "readme/fetchReadme",
  async ({ username, repo }: { username: string; repo: string }, { rejectWithValue }) => {
    try {
      const response = await githubApi.get(`/repos/${username}/${repo}/readme`)
      const decodedContent = decodeBase64(response.data.content);
      return decodedContent;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch README");
    }
  }
);

const readmeSlice = createSlice({
  name: "readme",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReadme.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReadme.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
      })
      .addCase(fetchReadme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default readmeSlice.reducer;
