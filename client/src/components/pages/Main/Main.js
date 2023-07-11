import { useState } from "react"
import FormInput from "../../usable/FormInput"
import "./Main.css"
import ImageIcon from "../../../images/ImageIcon.js"

function Main(){
  const [file,setFIle] = useState("")
  return (
    <div className="main-container">
      <div className="img-selector-container">
        <div className="image-load-container">
          <ImageIcon/>
        </div>
        <input 
          value={file}
          type="file"
          className="image-selector"
        />
      </div>
      
    </div>
  )
}

export default Main