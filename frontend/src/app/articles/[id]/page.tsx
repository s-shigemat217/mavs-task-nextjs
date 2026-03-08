"use client";
import { useEffect, useState } from "react";
import { Article } from "../types/Article/Article";
import Link from "next/link";

export default function ArticleDetail({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Article | null>(null);

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
      <Link href="/articles">記事一覧へ</Link>
    </div>
  );
}
