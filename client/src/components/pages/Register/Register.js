import FormButton from "../../usable/FormButton"
import FormInput from "../../usable/FormInput"
import "./Register.css"

function Register(){
  return (
    <div className="reg-container">
        <h1>Register</h1>
        <FormInput
          type={"email"}
        />
        <FormInput
          type={"password"}
        />
        <FormButton
        />
    </div>
  )
}

export default Register