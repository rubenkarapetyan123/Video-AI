import { useState } from "react"
import FormButton from "../../usable/FormButton"
import FormInput from "../../usable/FormInput"

function Login(){
  const [inputData,setInputData] = useState({
    email : "",
    password : ""
  })
  const emailHandle = e => setInputData({
    ...inputData,email : e.target.value})
  const passwordHandle = e => setInputData({
    ...inputData,password : e.target.value})



    const submitHandle = async e =>{
      e.preventDefault()
      try{
        const response = await fetch("/login",{
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify(inputData)
        })
        const res = await response.json()
        console.log(res);
      }catch(err){
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
          <FormButton
            text={"Sign in"}
          />
        </form>
    </div>
  )
}

export default Login