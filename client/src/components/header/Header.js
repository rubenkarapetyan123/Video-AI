import { Link } from "react-router-dom"
import "./Header.css"
import { LOGIN, REGISTER } from "../../constants/routes-constants"
import Logo from "./components/Logo"
import HeaderButton from "./components/HeaderButton"

function Header(){
  return (
    <header>
      <Logo/>
      <div className="header-buttons-container">
        <HeaderButton text={"Sign in"} className={"header-login-button"} route={LOGIN}/>
        <HeaderButton text={"Sign up"} className={"header-register-button"} route={REGISTER}/>
      </div>
      </header>
  )
}

export default Header