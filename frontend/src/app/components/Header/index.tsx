"use client";
import { useRouter } from "next/navigation";
import styles from "./header.module.css";
import { useLoginData } from "@/hooks/useLoginData";

export default function Header() {
	const router = useRouter();
	const { loginData, setLoginData } = useLoginData();

	const logout = () => {
		setLoginData(undefined);
		router.push("/");
	};
	return (
		<header className={styles.header}>
			<h1 className={styles.header_logo} onClick={() => router.push("/")}>
				ToDo Notes
			</h1>
			<div className={styles.header_right}>
				{loginData && (
					<div className={styles.header_welcome}>
						<p className={styles.header_welcomeLabel}>ようこそ</p>
						<p>{loginData?.email} さん</p>
					</div>
				)}

				{loginData ? (
					<button className={styles.header_action} onClick={logout}>
						ログアウト
					</button>
				) : (
					<button
						className={styles.header_action}
						onClick={() => router.push("/signin")}
					>
						サインイン
					</button>
				)}
			</div>
		</header>
	);
}
