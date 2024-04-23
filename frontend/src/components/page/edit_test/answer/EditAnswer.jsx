import {useState} from "react";
import "./edit_answer.css";

export default function EditAnswer({ id, answer, answer_id=-1, deleteAnswer }) {
	const [text, setText] = useState(`${answer}`);
	return (
		<div className="edit__answer">
			<div className="metadata" style={{display: "none"}}>
				<div id="id">{answer_id}</div>
			</div>
			<label>
				{"Ответ: "}
				<input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
			</label>
			<svg className="delete" xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 32 32" version="1.1"
			     onClick={deleteAnswer} id={id}>
				<path id={id}
				      d="M2.016 8q0 0.832 0.576 1.44t1.408 0.576v16q0 2.496 1.76 4.224t4.256 1.76h12q2.464 0 4.224-1.76t1.76-4.224v-16q0.832 0 1.408-0.576t0.608-1.44-0.608-1.408-1.408-0.576h-5.984q0-2.496-1.792-4.256t-4.224-1.76q-2.496 0-4.256 1.76t-1.728 4.256h-6.016q-0.832 0-1.408 0.576t-0.576 1.408zM8 26.016v-16h16v16q0 0.832-0.576 1.408t-1.408 0.576h-12q-0.832 0-1.44-0.576t-0.576-1.408zM12 23.008q0 0.416 0.288 0.704t0.704 0.288 0.704-0.288 0.32-0.704v-8q0-0.416-0.32-0.704t-0.704-0.288-0.704 0.288-0.288 0.704v8zM14.016 6.016q0-0.832 0.576-1.408t1.408-0.608 1.408 0.608 0.608 1.408h-4zM18.016 23.008q0 0.416 0.288 0.704t0.704 0.288 0.704-0.288 0.288-0.704v-8q0-0.416-0.288-0.704t-0.704-0.288-0.704 0.288-0.288 0.704v8z"/>
			</svg>
		</div>
	)
}