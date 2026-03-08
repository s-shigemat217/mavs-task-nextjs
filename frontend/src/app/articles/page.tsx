"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  const deleteArticle = async (id) => {
    if (!confirm("削除しますか？")) return;

    await fetch(`http://localhost:3001/articles/${id}`, {
      method: "DELETE",
    });

    setArticles(articles.filter((article) => article.id !== id));
  };

  return (
    <div>
      <h1>記事一覧</h1>

      {articles.map((article) => (
        <div key={article.id}>
          <Link href={`/articles/${article.id}`}>{article.title}</Link>
          <Link href={`/articles/edit/${article.id}/`}>編集</Link>
          <button onClick={() => deleteArticle(article.id)}>削除</button>
        </div>
      ))}

      <Link href="/articles/new">記事作成</Link>
    </div>
  );
}
