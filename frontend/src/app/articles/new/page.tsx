"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

      <input
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <textarea
        placeholder="本文"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />

      <button onClick={createArticle}>作成</button>
    </div>
  );
}
