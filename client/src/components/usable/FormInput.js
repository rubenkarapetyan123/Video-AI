import "./Form.css"

const FormInput = ({type, handle, value})=>{
  return (
    <label><p>{type}</p><input
      className="form-input"
      required
      value={value}
      onChange={handle}
      type={type}
    /></label>
  )
}

export default FormInput