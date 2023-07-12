const FormButton = ({ text, loading })=>{
  return (
    <button className="form-button" type="submit" disabled={loading}>{text}</button>
  )
}
export default FormButton