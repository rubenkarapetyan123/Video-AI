import { Link } from "react-router-dom"
import "./Header.css"
import { LOGIN, REGISTER } from "../../constants/routes-constants"
import Logo from "./components/Logo"
import HeaderButton from "./components/HeaderButton"

function Header(){
  return (
    <header>
      <Logo/>
      <HeaderButton text={"Login"} className={"header-login-button"} route={LOGIN}/>
      <HeaderButton text={"Register"} className={"header-register-button"} route={REGISTER}/>
      </header>
  )
}

export default Header