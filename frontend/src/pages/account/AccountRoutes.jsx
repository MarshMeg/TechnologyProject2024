import {Routes, Route} from "react-router-dom";
import Logout from "./Logout.jsx";
import AccountPage from "./page/AccountPage.jsx";
import LoginPage from "./login/LoginPage.jsx";
import RegPage from "./reg/RegPage.jsx";

export default function AccountRoutes() {
	return (
		<>
			<Routes>
				<Route path={ '' } element={ <AccountPage /> } />
				<Route path={ 'login' } element={ <LoginPage /> } />
				<Route path={ 'registration' } element={ <RegPage /> } />
				<Route path={ 'logout' } element={ <Logout /> } />
			</Routes>
		</>
)}
