import { Link } from "react-router-dom"


const HeaderButton =({ text, route, className })=>{
  return (
    <Link className={className} to={route}>{text}</Link>
  )
}

export default HeaderButton