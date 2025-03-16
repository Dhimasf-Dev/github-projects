"use client";

import { useSearchParams } from "next/navigation";
import ReadmeViewer from "../components/ReadmeViewer";
import Link from "next/link";
import styles from "../styles/ReadmePage.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { Suspense } from "react";

function ReadmeContent() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const repo = searchParams.get("repo");

  if (!username || !repo) {
    return <p className={styles.error}>Please provide a valid repository username and name.</p>;
  }

  return (
    <div className={styles.readmePageWrapper}>
      <Link href={`/?username=${username}`} className={styles.backLink}>
        <FaArrowLeft className={styles.icon} aria-label="arrowLeft"/> Back
      </Link>
      <div className={styles.readmeContainer}>
        <h1 className={styles.title}>{repo} README</h1>
        <ReadmeViewer username={username} repo={repo} />
      </div>
    </div>
  );
}

export default function ReadmePage() {
  return (
    <Suspense fallback={<p className={styles.loading}>Loading README...</p>}>
      <ReadmeContent />
    </Suspense>
  );
}
