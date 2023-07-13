import { useContext, useState } from "react"
import { setToken } from "../../../utils/api-utils"
import FormButton from "../../usable/FormButton"
import FormInput from "../../usable/FormInput"
import { useNavigate } from "react-router"
import { MAIN } from "../../../constants/routes-constants"
import { UserContext } from "../../../App"

function Login(){
  const [inputData,setInputData] = useState({
    email : "",
    password : ""
  })
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const emailHandle = e => setInputData({
    ...inputData,email : e.target.value})
  const passwordHandle = e => setInputData({
    ...inputData,password : e.target.value})



  const submitHandle = async e =>{
    e.preventDefault()
    try{
      setLoading(true)
      const response = await fetch("/login",{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(inputData)
      })
      const res = await response.json()
      if(res.access){
        setToken(res.token)
        navigate("/"+MAIN)
        setUser({
          isAuth : true,
          username : res.username
        })
      }else{
        setError(res.message)
      }
      setLoading(false)
    }catch(err){
      setLoading(false)
      console.log(err)
    }
  }


  return (
    <div className="reg-container">
        <h1>Login</h1>
        <form className="reg-container" onSubmit={submitHandle}>
          <FormInput
            type={"email"}
            value={inputData.email}
            handle={emailHandle}
          />
          <FormInput
            type={"password"}
            value={inputData.password}
            handle={passwordHandle}
          />
          <br/>
          <span>{error}</span>
          <FormButton
            text={"Sign in"}
            loading={loading}
          />
        </form>
    </div>
  )
}

export default Login