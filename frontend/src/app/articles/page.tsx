"use client";

import { useEffect, useState } from "react";
import { Article } from "../types/Article/Article";
import Link from "next/link";

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

  const deleteArticle = async (id: string) => {
    if (!confirm("削除しますか？")) return;

    await fetch(`http://localhost:3001/articles/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("記事の削除に失敗しました。");
      return;
    }

    // 削除が成功したら記事一覧を更新する
    setArticles((prev) => prev.filter((article) => article.id !== id));
  };

  return (
    <div>
      <h1>記事一覧</h1>

      {articles.map((article) => (
        <div key={article.id}>
          <Link href={`/articles/${article.id}`}>{article.title}</Link>
          <Link href={`/articles/edit/${article.id}`}>編集</Link>
          <button onClick={() => deleteArticle(article.id)}>削除</button>
        </div>
      ))}

      <Link href="/articles/new">記事作成</Link>
    </div>
  );
}
