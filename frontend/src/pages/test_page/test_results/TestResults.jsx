import DataAPI from "../../../api/DataAPI.ts";
import "./test_results.css";

export default function TestResults()
{
	const true_answers = new DataAPI().check_answers()

	return (
		<>
			{ "Ваши ответы:" }
			<table>
				<thead>
					<tr>
						<th>№ вопроса</th>
						<th>Результат</th>
					</tr>
				</thead>
				<tbody>
				{
					true_answers.map((answer, index) => (
						<tr>
							<th>{ index }</th>
							<th>{ answer }</th>
						</tr>
					))
				}
				</tbody>
			</table>
		</>
	)
}