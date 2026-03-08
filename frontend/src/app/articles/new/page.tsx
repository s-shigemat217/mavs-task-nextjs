"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <div>
      <h1>記事作成</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createArticle();
        }}
      >
        <input
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="本文"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br />

        <button onClick={createArticle}>作成</button>
      </form>
      <Link href="/articles">記事一覧へ</Link>
    </div>
  );
}
