import { useState } from "react"
import FormButton from "../../usable/FormButton"
import FormInput from "../../usable/FormInput"
import "./Register.css"

function Register(){
  const [inputData,setInputData] = useState({
    username : "",
    email : "",
    password : ""
  })
  const usernameHandle = e => setInputData({
    ...inputData,username : e.target.value})
  const emailHandle = e => setInputData({
    ...inputData,email : e.target.value})
  const passwordHandle = e => setInputData({
    ...inputData,password : e.target.value})



  console.log(inputData);
  return (
    <div className="reg-container">
        <h1>Register</h1>
        <form>
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
          <FormButton
            text={"Sign up"}
          />
        </form>
    </div>
  )
}

export default Register