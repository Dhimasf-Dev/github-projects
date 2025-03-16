import axios from "axios";

const URL_BASE = process.env.NEXT_PUBLIC_URL_BASE;
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export const githubApi = axios.create({
  baseURL: URL_BASE,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  },
});
