import { configureStore } from "@reduxjs/toolkit";
import repositoriesReducer from "./slices/fetchRepositories";
import readmeReducer from "./slices/fetchReadme";
import userReducer from "./slices/searchUser";

export const store = configureStore({
  reducer: {
    repositories: repositoriesReducer,
    readme: readmeReducer,
    username: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
