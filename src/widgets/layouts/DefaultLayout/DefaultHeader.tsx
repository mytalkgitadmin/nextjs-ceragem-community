"use client";
import Link from "next/link";
import { useAuth } from "@/features/auth";
import { HeadingLogo } from "@/shared/ui/HeadingLogo";

import styles from "./DefaultHeader.module.scss";

export default function DefaultHeader() {
  const { isAuthenticated } = useAuth();
  return (
    <header className={styles.header}>
      <div className="max-width">
        <HeadingLogo />
        {!isAuthenticated ? (
          <Link href="/login" className={styles.btn}>
            로그인
          </Link>
        ) : (
          <Link href="/friends" className={styles.btn}>
            FETA 열기
          </Link>
        )}
      </div>
    </header>
  );
}
