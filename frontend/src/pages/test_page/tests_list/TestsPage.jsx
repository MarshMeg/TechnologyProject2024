import {Link, useLocation} from "react-router-dom";
import DataAPI from "../../../api/DataAPI.ts";
import Test from "../../../components/page/test/Test.jsx";
import LoadDataError from "../../../components/page/load_data_error/LoadDataError.jsx";
import "./test_page.css"

import next_img from "../../../imgs/pages/next.png"
import previous_img from "../../../imgs/pages/previous.png"

export default function TestsPage() {
	const page_number = () => {
		let page_n = Number(new URLSearchParams(useLocation().search).get('page'))
		if (page_n < 1) page_n = 1
		return page_n
	}

	const tests_list = new DataAPI().get_tests(page_number())
	let tests_map
	try {
		tests_map = tests_list['tests'].map(test => (
			<Test
				id={ test.id }
				name={ test.name }
				created_time={ test.created_time }
				author={ test.author }
				watched={ test.watched }
				likes={ test.likes }
			/>
		))
	} catch (e) {
		return (
			<main id="tests">
				<div className="tests">
					<LoadDataError error_text={`Backend offline. Tests not found.`}/>
				</div>
			</main>
		)
	}

	return (
		<main id="tests">
			<div className="tests">
				{ tests_map }
			</div>
			<div className="pages" onClick={ window.scrollTo({top: 0, behavior: 'smooth'}) }>
				<div id="previous_page" className={ (tests_list['previous_page']) ? 'active': '' }>
					<Link to={ `/test?page=${page_number()-1}` } replace>
						<img src={ previous_img }/>
						<p>Предыдущая</p>
					</Link>
				</div>
				<div id="next_page" className={ (tests_list['next_page']) ? 'active': '' }>
					<Link to={ `/test?page=${page_number()+1}` } replace>
						<p>Следующая</p>
						<img src={ next_img }/>
					</Link>
				</div>
			</div>
		</main>
	)
}