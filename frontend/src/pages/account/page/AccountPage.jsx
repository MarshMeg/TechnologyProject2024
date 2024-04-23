import {Navigate} from "react-router-dom";
import TestObject from "../../../components/page/account_page/TestObject.jsx";
import DataAPI from "../../../api/DataAPI.ts";
import "./account_page.css"
import {useState} from "react";

export default function AccountPage() {
	if (parseInt(localStorage.getItem('loginStatus')) !== 200) return <Navigate to={ '/account/login' } replace />

	const [MyTests, setMyTests] = useState(new DataAPI().get_my_tests())

	const edit_test = (e, id) => {
		window.open(`/edit/${id}`, 'popupWindow', 'width=600,height=400')
	}

	const new_test = () => {
		let title_el = document.getElementById('test_title')
		new DataAPI().new_test(title_el.value)
		title_el.value = ""
		setMyTests(new DataAPI().get_my_tests())
	}

	const del_test = () => {
		let title_el = document.getElementById('test_title_del')
		new DataAPI().del_test(title_el.value)
		title_el.value = ""
		setMyTests(new DataAPI().get_my_tests())
	}

	return (
		<main id="account_page">
			<div className="dialogs">
				<dialog id="create_test" style={{display: "none"}}>
					<form method="dialog">
						<label htmlFor="username">Название теста:</label>
						<input
							type="text"
							id="test_title"
							required
						/>
						<button onClick={e => {
							window["create_test"].style.display = "none"
							new_test()
						}}>Добавить</button>
					</form>
				</dialog>

				<dialog id="delete_test" style={{display: "none"}}>
					<form method="dialog">
						<label htmlFor="username">Название теста:</label>
						<input
							type="text"
							id="test_title_del"
							required
						/>
						<button onClick={() => {
							window["delete_test"].style.display = "none"
							window["delete_confirm"].showModal()
							window["delete_confirm"].style.display = "flex"
						}}>Удалить</button>
					</form>
				</dialog>

				<dialog id="delete_confirm" style={{display: "none"}}>
					<form method="dialog">
						<button onClick={e => {
							window["delete_confirm"].style.display = "none"
						}}>Отмена</button>

						<button onClick={e => {
							window["delete_confirm"].style.display = "none"
							del_test()
						}}>Подтвердить</button>
					</form>
				</dialog>
			</div>

			<nav>
				<button onClick={e => {
					window["create_test"].showModal()
					window["create_test"].style.display = "flex"
				}}>Новый тест</button>
				<button onClick={e => {
					window["delete_test"].showModal()
					window["delete_test"].style.display = "flex"
				}}>Удалить тест</button>
			</nav>
			<div id="my__tests">
				{
					MyTests.map((test) => (
						<button onClick={(e) => edit_test(e, test.id)}>
							<TestObject
								name={test.name}
								created_time={test.created_time}
								watched={test.watched}
								likes={test.likes}
							/>
						</button>
					))
				}
			</div>
		</main>
	)
}