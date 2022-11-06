import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { VscSearch } from "react-icons/vsc";
import { BsListNested } from "react-icons/bs";
import styles from "./Navbar.module.scss";
import { getNewEpisodeCount } from "util/newEpisode";

const Logo = dynamic(
  () => import("@components/Logo/Logo").then((mod) => mod.Logo),
  { ssr: false }
);

export function Navbar() {
  const fetchNewEpisodeCount = async () => {
    const count = await getNewEpisodeCount(["chainsaw-man"]);
    setNewEpisodeCount(count);
  };

  const [newEpisodeCount, setNewEpisodeCount] = useState(0);

  useEffect(() => {
    fetchNewEpisodeCount();
  }, []);

  return (
    <nav className={styles.Nav}>
      <div className="left">
        <Link href="/list" className={styles.listIcon}>
          <BsListNested />
          {newEpisodeCount > 0 && (
            <div className={styles.counter}>{newEpisodeCount}</div>
          )}
        </Link>
      </div>
      <div className="center">
        <Link href="/" className={styles.logo}>
          <Logo />
        </Link>
      </div>
      <div className="right">
        <Link href="/search">
          <VscSearch />
        </Link>
      </div>
    </nav>
  );
}