import {Link, Navigate, useParams} from "react-router-dom";
import QuestionListObj from "../../../components/page/go/question_list_obj/QuestionListObj.jsx";
import AnswerObj from "../../../components/page/go/answer/AnswerObj.jsx";
import { useState } from "react";
import DataAPI from "../../../api/DataAPI.ts";
import "./test_go.css"

export default function TestGo() {
	// test data
	const test = JSON.parse(localStorage.getItem('testData'))
	if (Number(useParams().id) !== test.id)
	{
		return <Navigate to={`/test/${useParams().id}`} relative/>
	}

	// switch question
	const [questionID, setQuestionID] = useState(0)
	const question = test.questions[questionID]

	const [answer, setAnswer] = useState("")

	const button = () =>
	{
		if (test.questions.length-1 > questionID) {
			return (
				<button onClick={ () => {
					setQuestionID(questionID + 1)
					new DataAPI().post_answers(`${questionID}_${answer}`, test.id)
					setAnswer("")
				} }>
					Далее
				</button>
			)
		} else {
			return (
				<button onClick={ () => {
					new DataAPI().post_answers(`${questionID}_${answer}`, test.id)
					setAnswer("")
				} }>
					<Link to={ `/test/results?test_id=${test.id}` } replace>Сохранить</Link>
				</button>
			)
		}
	}

	return (
		<main id="test_go">
			<div id="test">
				<div className="question_list">
					{
						test.questions.map((question, index) => (
							<QuestionListObj key={ index } open_fun={ () => setQuestionID(index) } text={ question.text }/>
						))
					}
				</div>
				<div className="question">
					<p>{ question.text }</p>
					<div className="answers">
						{
							question.answers.map((answer, index) => (
								<AnswerObj key={ index } text={ answer } index={ index } />
							))
						}
					</div>
					<div className="answer">
						<label htmlFor="">
							{ "Укажите верные варианты ответа: " }
							<input type="text" onChange={ (e) => setAnswer(e.target.value) } value={ answer }/>
						</label>
					</div>
					{ button() }
				</div>
			</div>
		</main>
	)
}