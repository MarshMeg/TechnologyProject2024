import EditAnswer from "../answer/EditAnswer.jsx";
import {useState} from "react";
import "./edit_question.css";

export default function EditQuestion({ id, question, answers_, question_id=-1, deleteQuestion }) {
	const new_answer = () => {
		let id = answers.length
		for (let i = 0; i < id; i++) {
			if (i !== answers[i].props.id) {
				id = i
				break
			}
		}
		setAnswers((prevState) => [...prevState, <EditAnswer id={id} answer="" deleteAnswer={delete_answer} />])
	}
	const delete_answer = (e) => setAnswers((prevState) => prevState.filter(a => a.props.id !== parseInt(e.target.id)))

	const [answers, setAnswers] = useState(answers_.map((answer, i) => (
		<EditAnswer key={i} id={i} answer={answer.text} answer_id={answer.id} deleteAnswer={delete_answer} />
	)));

	const [text, setText] = useState(`${question}`);

	return (
		<div className="edit__question">
			<div className="metadata" style={{display: "none"}}>
				<div id="id">{question_id}</div>
			</div>
			<div className="questionTextArea">
				<label>
					{"Вопрос: "}
					<input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
				</label>
				<svg className="delete" xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 32 32" version="1.1"
				     onClick={deleteQuestion} id={id}>
					<path id={id}
					      d="M2.016 8q0 0.832 0.576 1.44t1.408 0.576v16q0 2.496 1.76 4.224t4.256 1.76h12q2.464 0 4.224-1.76t1.76-4.224v-16q0.832 0 1.408-0.576t0.608-1.44-0.608-1.408-1.408-0.576h-5.984q0-2.496-1.792-4.256t-4.224-1.76q-2.496 0-4.256 1.76t-1.728 4.256h-6.016q-0.832 0-1.408 0.576t-0.576 1.408zM8 26.016v-16h16v16q0 0.832-0.576 1.408t-1.408 0.576h-12q-0.832 0-1.44-0.576t-0.576-1.408zM12 23.008q0 0.416 0.288 0.704t0.704 0.288 0.704-0.288 0.32-0.704v-8q0-0.416-0.32-0.704t-0.704-0.288-0.704 0.288-0.288 0.704v8zM14.016 6.016q0-0.832 0.576-1.408t1.408-0.608 1.408 0.608 0.608 1.408h-4zM18.016 23.008q0 0.416 0.288 0.704t0.704 0.288 0.704-0.288 0.288-0.704v-8q0-0.416-0.288-0.704t-0.704-0.288-0.704 0.288-0.288 0.704v8z"/>
				</svg>
			</div>
			<div className="edit__answers">
				<label>
					{"Правильный ответ: "}
					<input type="text"/>
				</label>
				{answers}
				<svg className="new" xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 32 32" version="1.1"
				     onClick={new_answer}>
					<path
						d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-2.496-1.76-4.256t-4.224-1.76h-20q-2.496 0-4.256 1.76t-1.76 4.256v20zM4 26.016v-20q0-0.832 0.576-1.408t1.44-0.608h20q0.8 0 1.408 0.608t0.576 1.408v20q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408zM8 16q0 0.832 0.576 1.44t1.44 0.576h4v4q0 0.832 0.576 1.408t1.408 0.576 1.408-0.576 0.608-1.408v-4h4q0.8 0 1.408-0.576t0.576-1.44-0.576-1.408-1.408-0.576h-4v-4q0-0.832-0.608-1.408t-1.408-0.608-1.408 0.608-0.576 1.408v4h-4q-0.832 0-1.44 0.576t-0.576 1.408z"/>
				</svg>
			</div>
		</div>
	)
}