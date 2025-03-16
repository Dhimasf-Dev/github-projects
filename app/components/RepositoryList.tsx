import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepositories } from "../../store/slices/fetchRepositories";
import { RootState, AppDispatch } from "../../store";
import styles from "../styles/RepositoryList.module.css";
import { Repo } from "../types/github";
import { FaStar, FaCodeBranch, FaCode, FaBookOpen } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function RepositoryList({username}: {username: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { repositories, loading, error } = useSelector((state: RootState) => state.repositories);
  const router = useRouter();

  const handleViewReadme = (repoName: string) => {
    router.push(`/readme?username=${username}&repo=${repoName}`);
  };

  useEffect(() => {
    if (username) {
      dispatch(fetchRepositories(username));
    }
  }, [username]);


  if (loading) {
    return (
      <div className={styles.repoContainer}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={styles.skeletonCard} />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.repoContainer}>
      {repositories.map((repo: Repo) => (
        <div key={repo.id} className={styles.repoCard}>
            <h3>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={styles.repoTitle}>
                    {repo.name}
                </a>
            </h3>
            {/* <p className={styles.description}>{repo.description || "No description available."}</p> */}

            <div className={styles.repoInfo}>
                <span><FaStar className={styles.icon} aria-label="Stars" /> {repo.stargazers_count}</span>
                <span><FaCodeBranch className={styles.icon} aria-label="codeBranch"/> {repo.forks_count}</span>
                <span><FaCode className={styles.icon} aria-label="code"/> {repo.language || "Unknown"}</span>
            </div>

            <button className={styles.readmeButton} onClick={() => handleViewReadme(repo.name)}>
                <FaBookOpen className={styles.icon} /> View README
            </button>
        </div>
      ))}
    </div>
  );
}
