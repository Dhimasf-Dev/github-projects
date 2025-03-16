"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReadme } from "../../store/slices/fetchReadme";
import { RootState, AppDispatch } from "../../store";
import styles from "../styles/ReadmeViewer.module.css";

export default function ReadmeViewer({ username, repo }: { username: string; repo: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { content, loading, error } = useSelector((state: RootState) => state.readme);

  useEffect(() => {
    if (username && repo) {
      dispatch(fetchReadme({ username, repo }));
    }
  }, [username, repo]);

  if (loading) {
    return (
      <div className={styles.skeletonContainer}>
        <div className={styles.skeletonContent}></div>
      </div>
    );
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.readmeContent}>
        <pre>{content}</pre>
    </div>
  );
}
