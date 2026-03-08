"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../articles.module.css";

export default function NewArticle() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createArticle = async () => {
    await fetch("http://localhost:3001/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    router.push("/articles");
  };

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <h1 className={styles.title}>記事作成</h1>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            createArticle();
          }}
        >
          <div className={styles.field}>
            <label htmlFor="new-title" className={styles.label}>
              タイトル
            </label>
            <input
              id="new-title"
              className={styles.input}
              placeholder="タイトルを入力"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="new-content" className={styles.label}>
              本文
            </label>
            <textarea
              id="new-content"
              className={styles.textarea}
              placeholder="本文を入力"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <button type="submit" className={`${styles.button} ${styles.buttonPrimary}`}>
            作成
          </button>
        </form>
        <Link href="/articles" className={styles.metaLink}>
          記事一覧へ戻る
        </Link>
      </section>
    </main>
  );
}
