import { Link } from "react-router-dom"
import "./Header.css"
import { LOGIN, REGISTER } from "../../constants/routes-constants"
import Logo from "./components/Logo"
import HeaderButton from "./components/HeaderButton"
import { useContext } from "react"
import { UserContext } from "../../App"
import { getToken, setToken } from "../../utils/api-utils"
import { useNavigate } from "react-router"

function Header(){
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const logoutHandle = async ()=>{
    try{
      const response  = await fetch("/logout")
      const res = await response.json()
      if(res.access){
        setToken("")
        setUser({
          isAuth : false
        })
        navigate("/login")
      }
    }catch(err){
      console.log(err);
    }
  }
  return (
    <header>
      <Logo/>
      <div className="header-buttons-container">
        {user.isAuth ? <HeaderButton text={"Logout"} className={"header-login-button"} handle={logoutHandle}/> : <>
          <HeaderButton text={"Sign in"} className={"header-login-button"} route={LOGIN}/>
          <HeaderButton text={"Sign up"} className={"header-register-button"} route={REGISTER}/>
        </>}

      </div>
      </header>
  )
}

export default Header