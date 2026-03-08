"use client";
import { useEffect, useState } from "react";

export default function ArticleDetail({ params }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/articles/${params.id}`)
      .then((res) => res.json())
      .then((data) => setArticle(data));
  }, [params.id]);

  if (!article) return <p>loading...</p>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
}
