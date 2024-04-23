import AccountAPI from "../../api/AccountAPI.ts";
import {Navigate} from "react-router-dom";

export default function Logout() {
	new AccountAPI().logout()
	return <Navigate to={ '/account/login' } replace />
}