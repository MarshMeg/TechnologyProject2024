import { useState } from "react";
import AccountAPI from "../../../api/AccountAPI.ts";
import { passwords } from "./2048-most-common.js";
import './reg.css'
import * as test from "node:test";

export default function RegPage() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')

	if (parseInt(localStorage.getItem('loginStatus')) === 200) {
		document.location.pathname = "/account"
	}

	function submit(e) {
		let alert_ = false
		if (password !== passwordConfirm) {
			alert("Пароли не совпадают")
			alert_ = true
		}
		if (password.length < 8) {
			alert("Длинна пароля меньше 8 символов")
			alert_ = true
		}
		if (password in passwords) {
			alert("Пароль слишком распространён")
			alert_ = true
		}
		if (parseInt(password) == NaN) {
			alert("Пароль состоит только из цифр")
			alert_ = true
		}

		if (!alert_) {
			new AccountAPI().register(username, password)
		}
	}

	return (
		<main id={ 'reg' }>
			<form onSubmit={ submit }>
				<div className="input" id="username">
					<label htmlFor="username">Логин:</label>
					<input
						type="text"
						name="username"
						required
						value={ username }
						onChange={ (e) => setUsername(e.target.value) }
					/>
				</div>
				<div className="input" id="password">
					<label htmlFor="password">Пароль:</label>
					<input
						type="password"
						name="password"
						required
						value={ password }
						onChange={ (e) => setPassword(e.target.value) }
					/>
					<p style={{ fontSize: "0.85rem" }}>
						Пароль не должен быть слишком похож на другую вашу личную информацию. <br/>
						Ваш пароль должен содержать как минимум 8 символов. <br/>
						Пароль не должен быть слишком простым и распространенным. <br/>
						Пароль не может состоять только из цифры.
					</p>
				</div>
				<div className="input" id="password_check">
					<label htmlFor="password_check">Подтвердите пароль:</label>
					<input
						type="password"
						name="password_check"
						required
						value={ passwordConfirm }
						onChange={ (e) => setPasswordConfirm(e.target.value)}
					/>
				</div>
				<input
					type="submit"
					id="submit"
					value="Регистрация"
				/>
			</form>
		</main>
	)
}