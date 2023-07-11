import FormButton from "../../usable/FormButton"
import FormInput from "../../usable/FormInput"
import "./Register.css"

function Register(){
  return (
    <div className="reg-container">
        <h1>Register</h1>
        <FormInput
          type={"user name"}
        />
        <FormInput
          type={"email"}
        />
        <FormInput
          type={"password"}
        />
        <FormButton
          text={"Sign up"}
        />
    </div>
  )
}

export default Register