import { useState } from "react"
import FormButton from "../../usable/FormButton"
import FormInput from "../../usable/FormInput"
import "./Register.css"
import { useNavigate } from "react-router"
import { LOGIN } from "../../../constants/routes-constants"

function Register(){
  const [inputData,setInputData] = useState({
    username : "",
    email : "",
    password : ""
  })
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)
  const usernameHandle = e => setInputData({
    ...inputData,username : e.target.value})
  const emailHandle = e => setInputData({
    ...inputData,email : e.target.value})
  const passwordHandle = e => setInputData({
    ...inputData,password : e.target.value})


    const submitHandle = async e =>{
      e.preventDefault()
      try{
        setLoading(true)
        const response = await fetch("/register",{
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify(inputData)
        })
        const res = await response.json()
        if(res.access){
          navigate(LOGIN)
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
        <h1>Register</h1>
        <form className="reg-container" onSubmit={submitHandle}>
          <FormInput
            type={"username"}
            value={inputData.username}
            handle={usernameHandle}
          />
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
            text={"Sign up"}
            loading={loading}
          />
        </form>
    </div>
  )
}

export default Register

