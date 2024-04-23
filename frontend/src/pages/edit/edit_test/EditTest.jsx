import DataAPI from "../../../api/DataAPI.ts";
import { useParams } from "react-router-dom";
import {useState} from "react";
import EditQuestion from "../../../components/page/edit_test/question/EditQuestion.jsx";
import "./edit_test.css";


export default function EditTest()
{
	const base_test_data = new DataAPI().get_my_test_data(parseInt(useParams()['id']))

	const new_question = () => {
		let id = questions.length
		for (let i = 0; i < id; i++) {
			if (i !== questions[i].props.id) {
				id = i
				break
			}
		}
		setQuestions((prevState) => [...prevState, <EditQuestion key={id} id={id} question="" answers_={[]} deleteQuestion={delete_question}/>])
	}
	const delete_question = (e) => setQuestions((prevState) => prevState.filter(p => p.props.id !== parseInt(e.target.id)))

	const [questions, setQuestions] = useState(base_test_data.questions.map((question, i) => (
		<EditQuestion key={i} id={i} question={question.text} answers_={question.answers} question_id={question.id} deleteQuestion={delete_question} />
	)))

	const [title, setTitle] = useState(`${base_test_data.name}`)

	const submit = (e) => {
	  let questions_ = []
		for (let quest_ of document.querySelectorAll("div.edit__question")) {
			let answers = []
			for (let answer_ of quest_.querySelectorAll("div.edit__answer")) {
				answers.push({
					"id": parseInt(answer_.querySelector("div.metadata div#id").innerHTML),
					"text": answer_.querySelector("input").value
				})
			}

			questions_.push({
				"id": parseInt(quest_.querySelector("div.metadata div#id").innerHTML),
				"text": quest_.querySelector(".questionTextArea input").value,
				"answers": answers,
				"true_answers": quest_.querySelector(".edit__answers label input").value
			})
		}

		new DataAPI().post_my_test({
			"id": parseInt(document.querySelector("div.metadata div#id").innerHTML),
			"title": title,
			"questions": questions_
		})
	}
	
	return (
		<main id="edit_test">
			<div id={"form"} onSubmit={ submit }>
				<div className="metadata" style={{display: "none"}}>
					<div id="id">{base_test_data.id}</div>
				</div>

				<div id="editor">
					<label id="title">
						{"Название: "}
						<input id="title" type="text" value={title}
						       onChange={(e) => setTitle(e.target.value)}
						/>
					</label>
					<div className="edit__questions">
						{questions}
						<svg className="new new_question" xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 32 32"
						     version="1.1"
						     onClick={new_question}>
							<path className="new_question"
							      d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-2.496-1.76-4.256t-4.224-1.76h-20q-2.496 0-4.256 1.76t-1.76 4.256v20zM4 26.016v-20q0-0.832 0.576-1.408t1.44-0.608h20q0.8 0 1.408 0.608t0.576 1.408v20q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408zM8 16q0 0.832 0.576 1.44t1.44 0.576h4v4q0 0.832 0.576 1.408t1.408 0.576 1.408-0.576 0.608-1.408v-4h4q0.8 0 1.408-0.576t0.576-1.44-0.576-1.408-1.408-0.576h-4v-4q0-0.832-0.608-1.408t-1.408-0.608-1.408 0.608-0.576 1.408v4h-4q-0.832 0-1.44 0.576t-0.576 1.408z"/>
						</svg>
					</div>
				</div>
				<button id={"submit"} onClick={submit}>Сохранить</button>
			</div>
		</main>
	)
}