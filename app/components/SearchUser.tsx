"use client";

import { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../store/slices/searchUser";
import { RootState, AppDispatch } from "../../store";
import styles from "../styles/SearchUser.module.css";
import { FaSearch, FaUsers, FaCodeBranch, FaUserFriends } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function SearchUserContent({ onSearch }: { onSearch: (username: string) => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialUsername = searchParams.get("username") || "";
  const [tempInput, setTempInput] = useState(initialUsername);
  const { username, loading, error } = useSelector((state: RootState) => state.username);

  useEffect(() => {
    if (initialUsername) {
      dispatch(searchUser(initialUsername));
      onSearch(initialUsername);
    }
  }, [initialUsername, onSearch, dispatch]);

  const handleSearch = () => {
    if (tempInput.trim()) {
      dispatch(searchUser(tempInput));
      onSearch(tempInput);
      router.push(`/?username=${tempInput}`);
    }
  };

  if (loading) {
    return (
      <div className={styles.skeletonContainer}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonSearchBox} />
      </div>
    );
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>GitHub Username Search</h1>
      <div className={styles.searchBox}>
        <input
          type="search"
          placeholder="Enter GitHub username..."
          value={tempInput}
          onChange={(e) => setTempInput(e.target.value)}
          className={styles.inputField}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          <FaSearch /> Search
        </button>
      </div>

      {username && (
        <div className={styles.userInfo}>
          {/* <Image 
              src={username.avatar_url} 
              alt="User Avatar" 
              width={100} 
              height={100} 
              className={styles.avatar}
              priority
          /> */}
          <div className={styles.userDetails}>
            <h2>{username.name || username.login}</h2>
            <p>{username.bio || "No bio available"}</p>
            <div className={styles.stats}>
              <span><FaUsers /> {username.followers} Followers</span>
              <span><FaUserFriends /> {username.following} Following</span>
              <span><FaCodeBranch /> {username.public_repos} Repos</span>
            </div>
            <a href={username.html_url} target="_blank" rel="noopener noreferrer" className={styles.profileButton}>
              View Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchUser({ onSearch }: { onSearch: (username: string) => void }) {
  return (
    <Suspense fallback={<p className={styles.loading}>Loading search...</p>}>
      <SearchUserContent onSearch={onSearch} />
    </Suspense>
  );
}
