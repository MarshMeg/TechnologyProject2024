import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import AccountRoutes from "./pages/account/AccountRoutes.jsx";
import TestsRoutes from "./pages/test_page/TestsRoutes.jsx";
import EditRoutes from "./pages/edit/EditRoutes.jsx";
import AccountAPI from "./api/AccountAPI.ts";
import API from "./api/API.ts";
import './App.css'

export default function App() {
  localStorage.setItem('csrftoken', new API().request('csrf/', 'GET')['csrftoken'])
  localStorage.setItem('loginStatus', `${new AccountAPI().status()}`)

  return (
    <>
      <Header />
      <Routes>
        <Route path={ '/account/*' } element={ <AccountRoutes /> } />
        <Route path={ '/test/*' } element={ <TestsRoutes /> } />
        <Route path={ '/edit/*' } element={ <EditRoutes /> } />
        <Route path={ '*' } element={ <Navigate to="/test" replace /> } />
      </Routes>
    </>
  )
}
