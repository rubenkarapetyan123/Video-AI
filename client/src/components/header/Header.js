import { Link } from "react-router-dom"
import "./Header.css"
import { LOGIN, REGISTER } from "../../constants/routes-constants"


function Header(){
  return (
    <header>
      <div>Logo</div>
      <Link to={LOGIN}>Login</Link>
      <Link to={REGISTER}>Register</Link>
    </header>
  )
}

export default Header