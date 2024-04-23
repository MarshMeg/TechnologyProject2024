import {Route, Routes} from "react-router-dom";
import EditTest from "./edit_test/EditTest.jsx";

export default function EditRoutes() {
	return (
		<Routes>
			<Route path={ ":id" } element={ <EditTest /> } />
		</Routes>
	)
}