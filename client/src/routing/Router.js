import { Routes, Route } from "react-router"
import Login from "../components/pages/Login/Login"
import Main from "../components/pages/Main/Main"
import Register from "../components/pages/Register/Register"
import { LOGIN, REGISTER, MAIN } from "../constants/routes-constants"

function Router(){
  return (
    <Routes>
      <Route path={LOGIN} element={<Login/>}/>
      <Route path={REGISTER} element={<Register/>}/>
      <Route path={MAIN} element={<Main/>}/>
    </Routes>
  )
}

export default Router