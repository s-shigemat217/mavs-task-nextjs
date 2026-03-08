"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditArticle({ params }) {
  // router.push() を使うために useRouter を呼び出す
  const router = useRouter();

  // フォームの入力値を管理するための state を用意
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // コンポーネントがマウントされたときに記事のデータを取得してフォームにセットする
  useEffect(() => {
    fetch(`http://localhost:3001/articles/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
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

      <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <br />

      <textarea value={content} onChange={(e) => setContent(e.target.value)} />

      <br />

      <button onClick={updateArticle}>更新</button>
    </div>
  );
}
