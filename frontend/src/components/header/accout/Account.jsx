import AccountAPI from "../../../api/AccountAPI.ts"
import { Link } from "react-router-dom";
import "./accout.css"


export default function Account({ language, titles_map }) {
  let account = new AccountAPI()
  let username = account.get_status()

  if (username && username !== "") {
    return (
      <div className="account__box">
        <p>{ username } |</p>
        <Link to={ "/" + language + "/account/logout/" }>{ titles_map.logout }</Link>
      </div>
    )
  } else {
    return (
      <div className="account__box">
        <Link to={ "/" + language + "/account/login/" }>{ titles_map.login }</Link>
        <p>|</p>
        <Link to={ "/" + language + "/account/reg/" }>{ titles_map.reg }</Link>
      </div>
    )
  }
}