"use client";

import { useState } from "react";
import SearchUser from "./components/SearchUser";
import RepositoryList from "./components/RepositoryList";


export default function Home() {
  const [username, setUsername] = useState("");

  return (
    <div>
      <SearchUser onSearch={setUsername} />
      {username && (
        <RepositoryList username={username} />
      )}
    </div>
  );
}
