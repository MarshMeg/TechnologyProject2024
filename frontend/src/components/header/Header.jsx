import { Link } from "react-router-dom";
import {useEffect} from "react";
import './header.css';

export default function Header() {
  useEffect(() => {
    if (parseInt(localStorage.getItem('loginStatus')) === 200) {
      document.getElementById("logout_link").style.display = "block"
      document.getElementById("account_link").style.display = "block";
      document.getElementById("login_link").style.display = "none";
      document.getElementById("registration_link").style.display = "none";
    }
  }, []);

  return (
    <header>
      <nav className="header__navbar">
        <Link to={ "/tests_list" } id="test_link">Тесты</Link>
        <Link to={ "/account" } id="account_link" style={{display: "none"}}>Личный кабинет</Link>
        <Link to={ "/account/logout" } id="logout_link" style={{display: "none"}}>Выход</Link>
        <Link to={ "/account/login" } id="login_link" style={{display: "block"}}>Вход</Link>
        <Link to={ "/account/registration" } id="registration_link" style={{display: "block"}}>Регистрация</Link>
      </nav>
    </header>
  )
}