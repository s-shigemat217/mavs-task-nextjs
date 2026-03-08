"use client";

import { useEffect, useState } from "react";
import { Article } from "@/types/Article/Article";
import Link from "next/link";
import styles from "./articles.module.css";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/articles")
      .then((res) => {
        // API からのレスポンスが正常かどうかをチェック
        if (!res.ok) {
          throw new Error("記事取得失敗");
        }
        // レスポンスを JSON としてパースして返す
        return res.json();
      })
      .then((data) => setArticles(data))
      .catch((error) => {
        // エラーが発生した場合はコンソールにエラーメッセージを表示
        console.error(error);
        alert("記事の取得に失敗しました。");
      });
  }, []);

  const deleteArticle = async (id: number) => {
    // 削除の確認ダイアログを表示し、ユーザーがキャンセルした場合は処理を中断する
    if (!confirm("削除しますか？")) return;
    // API に DELETE リクエストを送信して記事を削除する
    const res = await fetch(`http://localhost:3001/articles/${id}`, {
      method: "DELETE",
    });
    // レスポンスが正常かどうかをチェックし、異常な場合はエラーメッセージを表示して処理を中断する
    if (!res.ok) {
      alert("記事の削除に失敗しました。");
      return;
    }
    // 削除が成功したら記事一覧を更新する
    setArticles((prev) => prev.filter((article) => article.id !== id));
  };

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>記事一覧</h1>
          <Link
            href="/articles/new"
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            新規作成
          </Link>
        </div>

        {articles.length === 0 ? (
          <p className={styles.empty}>記事がありません。新規作成してください。</p>
        ) : (
          <div className={styles.articleList}>
            {articles.map((article) => (
              <article key={article.id} className={styles.articleItem}>
                <Link
                  href={`/articles/${article.id}`}
                  className={styles.articleLink}
                >
                  {article.title}
                </Link>
                <div className={styles.actions}>
                  <Link
                    href={`/articles/edit/${article.id}`}
                    className={styles.button}
                  >
                    編集
                  </Link>
                  <button
                    type="button"
                    className={`${styles.button} ${styles.buttonDanger}`}
                    onClick={() => deleteArticle(article.id)}
                  >
                    削除
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
