import {Link, Navigate, useParams} from "react-router-dom";
import DataAPI from "../../../api/DataAPI.ts";
import AccountAPI from "../../../api/AccountAPI.ts";
import Test from "../../../components/page/test/Test.jsx";
import LoadDataError from "../../../components/page/load_data_error/LoadDataError.jsx";
import Question from "../../../components/page/test_info_page/Question.jsx";
import "./test_info_page.css"

export default function TestInfoPage()
{
	if (new AccountAPI().status() === 401) {
		return <Navigate to={ `/account/login?next=/test/${useParams().id}/go` } replace />
	}

	const PAGE_ID = Number(useParams().id)

	if (PAGE_ID === 0 || isNaN(PAGE_ID))
	{
		console.error(`${useParams().id} (id) not is number`)
		return <Navigate to={ '/tests' } replace />
	}

	let test_data = JSON.parse(localStorage.getItem('testData'))
	if (test_data !== PAGE_ID)
	{
		test_data = new DataAPI().get_test_data(PAGE_ID)
		localStorage.setItem('testData', JSON.stringify(test_data))
	}

	try {
		let __date = new Date(test_data.created_time)

		let date = {
			day: __date.getDate().toString().padStart(2, '0'),
			month: (__date.getMonth() + 1).toString().padStart(2, '0'),
			year: __date.getFullYear()
		}
	} catch {
		return <main id="test_page"><LoadDataError error_text={ `Backend offline. Test not found.` } /></main>
	}

	return (
		<main id="test_page">
			<Test
				id={ test_data.id }
				name={ test_data.name }
				author={ test_data.author }
				created_time={ test_data.created_time }
				likes={ test_data.likes }
				watched={ test_data.watched+1 }
			/>

			<div className="quesrions">
				{
					test_data.questions.map((question, index) => (
						<Question
							key={ index }
							text={ question.text }
							answers={ question.answers }
						/>
					))
				}
			</div>

			<div className="actions">
				<Link to={ `/test/${test_data.id}/go` } replace>Пройти тест</Link>
			</div>
		</main>
	)
}
