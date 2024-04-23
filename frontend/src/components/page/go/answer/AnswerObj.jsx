import "./answer_obj.css"

export default function AnswerObj({ text, index }) {
	return (
		<label className="answer">
			<>{ index+1 } { text }</>
			<br/>
		</label>
	)
}