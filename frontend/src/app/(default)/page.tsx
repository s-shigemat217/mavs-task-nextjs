import Link from "next/link";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="basic-card">
        <h2 className="page-title">ToDo Notes</h2>
        <p className="page-description">
          日々のメモやタスクを記録して、必要なときに見返せます。
        </p>
        <div className="quick-links">
          <Link href="/articles" className="quick-link">
            メモ一覧を見る
          </Link>
          <Link href="/articles/new" className="quick-link">
            新しく作成する
          </Link>
        </div>
      </section>
    </main>
  );
}
