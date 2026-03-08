"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@/types/Article/Article";
import Link from "next/link";

export default function EditArticle({ params }: { params: { id: string } }) {
  // router.push() を使うために useRouter を呼び出す
  const router = useRouter();

  // フォームの入力値を管理するための state を用意
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // コンポーネントがマウントされたときに記事のデータを取得してフォームにセットする
  useEffect(() => {
    fetch(`http://localhost:3001/articles/${params.id}`)
      .then((res) => res.json())
      .then((data: Article) => {
        setTitle(data.title);
        setContent(data.content);
      });
  }, [params.id]);

  // 更新ボタンがクリックされたときに呼び出される関数
  const updateArticle = async () => {
    await fetch(`http://localhost:3001/articles/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    // 更新が成功したら記事一覧ページに遷移する
    router.push("/articles");
  };

  return (
    <div>
      <h1>記事編集</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateArticle();
        }}
      >
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">更新</button>
      </form>
      <Link href="/articles">記事一覧へ</Link>
    </div>
  );
}
