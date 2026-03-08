"use client";
import { useForm } from "react-hook-form";
import { LoginRequest } from "@/types/Login/LoginRequest";
import { LoginResponse } from "@/types/Login/LoginResponse";
import { useLoginData } from "@/hooks/useLoginData";
import { useRouter } from "next/navigation";
import styles from "./loginForm.module.css";

export default function LoginForm() {
	const router = useRouter();
	const { setLoginData } = useLoginData();
	const {
		register,
		handleSubmit,
		reset,
	} = useForm<LoginRequest>();
	const onSubmit = handleSubmit(async (request: LoginRequest) => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: request.email,
					password: request.password,
				}),
			},
		);
		const data: LoginResponse = await response.json();
		if (data.token) {
			// トークンの保持
			setLoginData(data);
			router.push("/");
		} else {
			reset();
		}
	});
	return (
		<form onSubmit={onSubmit} className={styles.loginForm}>
			<label htmlFor="login-email" className={styles.loginForm_label}>
				メールアドレス
			</label>
			<input
				id="login-email"
				className={styles.loginForm_input}
				placeholder="you@example.com"
				autoComplete="email"
				{...register("email")}
			/>
			<label htmlFor="login-password" className={styles.loginForm_label}>
				パスワード
			</label>
			<input
				id="login-password"
				className={styles.loginForm_input}
				placeholder="password"
				autoComplete="current-password"
				{...register("password")}
				type="password"
			/>
			<button className={styles.loginForm_button}>送信</button>
		</form>
	);
}
