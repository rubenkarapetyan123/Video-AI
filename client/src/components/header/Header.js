import { Link } from "react-router-dom"
import "./Header.css"
import { LOGIN, REGISTER } from "../../constants/routes-constants"
import Logo from "./components/Logo"

function Header(){
  return (
    <header>
      <Logo/>
      <Link to={LOGIN}>Login</Link>
      <Link to={REGISTER}>Register</Link>
    </header>
  )
}

export default Header