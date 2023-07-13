import { Link } from "react-router-dom"
import "./Header.css"
import { LOGIN, REGISTER } from "../../constants/routes-constants"
import Logo from "./components/Logo"
import HeaderButton from "./components/HeaderButton"
import { useContext } from "react"
import { UserContext } from "../../App"

function Header(){
  const { user } = useContext(UserContext)
  return (
    <header>
      <Logo/>
      <div className="header-buttons-container">
        {user.isAuth ? null : <>
          <HeaderButton text={"Sign in"} className={"header-login-button"} route={LOGIN}/>
          <HeaderButton text={"Sign up"} className={"header-register-button"} route={REGISTER}/>
        </>}

      </div>
      </header>
  )
}

export default Header