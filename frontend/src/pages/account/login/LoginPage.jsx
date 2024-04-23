import { useState } from "react";
import AccountAPI from "../../../api/AccountAPI.ts";
import './login.css'

export default function LoginPage() {
	const next_page = new URLSearchParams(location.search).get("next")

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	if (parseInt(localStorage.getItem('loginStatus')) === 200) {
		document.location.pathname = "/account"
	}

	function submit(e) {
		if (new AccountAPI().login(username, password) === 200) {
			if (next_page != null) {
				document.location.pathname = next_page
				alert(next_page)
			}
			document.location.search = ""
		}
	}

	return (
		<main id={'login'}>
			<form onSubmit={submit}>
				<div id="username">
					<label htmlFor="username">Логин:</label>
					<input
						type="text"
						name="username"
						required
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div id="password">
					<label htmlFor="password">Пароль:</label>
					<input
						type="password"
						name="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<input
					type="submit"
					id="submit"
					value="Вход"
				/>
			</form>
		</main>
	)
}