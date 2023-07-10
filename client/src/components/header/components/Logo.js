import { Link } from "react-router-dom"
import { MAIN } from "../../../constants/routes-constants"
import logo from "../../../images/logo.png"

const Logo =()=>{
  return (
    <div className="logo-container">
      <Link to={MAIN} className="logo-link"><img src={logo} alt="logo"/></Link>
    </div>
  )
}
export default Logo