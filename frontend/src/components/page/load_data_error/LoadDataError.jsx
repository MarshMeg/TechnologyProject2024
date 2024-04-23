import "./load_data_error.css"

export default function LoadDataError({ error_text }) {
	return (
		<div id="error">
			<h1>{ error_text }</h1>
		</div>
	)
}