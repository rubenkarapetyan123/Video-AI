import FormButton from "../../usable/FormButton"
import FormInput from "../../usable/FormInput"

function Login(){
  return (
    <div className="reg-container">
        <h1>Login</h1>
        <FormInput
          type={"email"}
        />
        <FormInput
          type={"password"}
        />
        <FormButton
          text={"Sign in"}
        />
    </div>
  )
}

export default Login