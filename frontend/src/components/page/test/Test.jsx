import { Link } from "react-router-dom";
import heart_img from "../../../imgs/test/heart.png"
import watch_img from "../../../imgs/test/eye.png"
import './test.css';

export default function Test({ id, name, author, created_time, likes, watched })
{
	let date = {date: new Date(created_time)}
	date['day'] = date.date.getDate().toString().padStart(2, '0')
	date['month'] = (date.date.getMonth() + 1).toString().padStart(2, '0');
	date['year'] = date.date.getFullYear();

	watched = parseInt(watched)

	return (
		<div className="test">
			<Link to={ `/test/${id}` }>
				<h3>{ name }</h3>
				<div className="test__info">
					<div className="test__info__author__created_at">
						{ `${date.day}.${date.month}.${date.year}` } { author }
					</div>
					<div className="test__info__nums">
						<div className="info__num" id="likes">
							<img src={ heart_img } alt=""/>
							{ likes }
						</div>
						<div className="info__num" id="watched">
							<img src={ watch_img } alt=""/>
							{ watched }
						</div>
					</div>
				</div>
			</Link>
		</div>
	)
}
