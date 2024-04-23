import {Route, Routes} from "react-router-dom";
import TestsPage from "./tests_list/TestsPage.jsx";
import TestInfoPage from "./test_info_page/TestInfoPage.jsx";
import TestGo from "./test_go/TestGo.jsx";
import TestResults from "./test_results/TestResults.jsx";

export default function TestsRoutes() {
	return (
		<Routes>
			<Route path={ '' } element={ <TestsPage /> } />
			<Route path={ ':id' } element={ <TestInfoPage /> } />
			<Route path={ ':id/go' } element={ <TestGo /> } />
			<Route path={ 'results' } element={ <TestResults /> } />
		</Routes>
	)
}