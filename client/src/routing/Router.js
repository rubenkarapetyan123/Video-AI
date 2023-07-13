import { useContext } from "react"
import { Routes, Route, Navigate } from "react-router"
import { UserContext } from "../App"
import Login from "../components/pages/Login/Login"
import Main from "../components/pages/Main/Main"
import Register from "../components/pages/Register/Register"
import { LOGIN, REGISTER, MAIN } from "../constants/routes-constants"

function Router(){
  const { user } = useContext(UserContext)
  return (
    <Routes>
      <Route path="*" element={<Navigate to={MAIN}/>}/>
      <Route path={LOGIN} element={user.isAuth ? <Navigate to={MAIN}/> : <Login/>}/>
      <Route path={REGISTER} element={user.isAuth ? <Navigate to={MAIN}/> : <Register/>}/>
      <Route path={MAIN} element={!user.isAuth ? <Navigate to={LOGIN}/> : <Main/>}/>
    </Routes>
  )
}

export default Router