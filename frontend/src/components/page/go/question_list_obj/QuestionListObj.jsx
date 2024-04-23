import "./question_list_obj.css";

export default function QuestionListObj({ open_fun, text, is_save }) {
	return (
		<div className="question_link" onClick={ open_fun }>
			<p>{ String(text).slice(0, 24) + '...' }</p>
		</div>
	)
}