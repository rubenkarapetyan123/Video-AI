import { Link } from "react-router-dom"


const HeaderButton =({ text, route, className, handle })=>{
  return (
    <Link className={className + " header-button"} to={route} onClick={handle}>{text}</Link>
  )
}

export default HeaderButton