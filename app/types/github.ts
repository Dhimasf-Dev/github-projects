export interface Repository {
    id: number;
    name: string;
    description?: string;
    html_url: string;
    stargazers_count: number;
  }
  
  export interface ReadmeState {
    content: string;
    loading: boolean;
    error: string | null;
  }
  
  export interface GithubState {
    repositories: Repository[];
    selectedRepo: string | null;
    readmeContent: string;
    loading: boolean;
    error: string | null;
  }

  export interface RepoState {
    repositories: any[];
    loading: boolean;
    error: string | null;
  }

  export interface GitHubUser {
    login: string;
    name?: string;
    bio?: string;
    avatar_url: string;
    followers: string;
    following: string;
    public_repos: string;
    html_url: string;
  }
  
  export interface UserState {
    username: GitHubUser | null;
    loading: boolean;
    error: string | null;
  }

  export interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    updated_at: string;
  }
  