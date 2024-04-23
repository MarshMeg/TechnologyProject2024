import "./question.css"

export default function Question({ text, answers })
{
	return (
		<div className="question">
			<h3>{ text }</h3>
			<div className="answers">
				{
					answers.map((answer, index) => (
						<p key={ index }>{ answer }</p>
					))
				}
			</div>
		</div>
	)
}