"use client";
import { useEffect, useState } from "react";
import { Article } from "@/types/Article/Article";
import Link from "next/link";
import styles from "../articles.module.css";

export default function ArticleDetail({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/articles/${params.id}`)
      .then((res) => res.json())
      .then((data) => setArticle(data));
  }, [params.id]);

  if (!article) {
    return (
      <main className={styles.page}>
        <section className={styles.panel}>
          <p className={styles.empty}>読み込み中...</p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>{article.title}</h1>
          <Link href={`/articles/edit/${article.id}`} className={styles.button}>
            編集
          </Link>
        </div>
        <p className={styles.content}>{article.content}</p>
        <Link href="/articles" className={styles.metaLink}>
          記事一覧へ戻る
        </Link>
      </section>
    </main>
  );
}
