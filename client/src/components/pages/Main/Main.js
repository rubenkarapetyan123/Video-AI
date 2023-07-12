import { useState } from "react"
import FormInput from "../../usable/FormInput"
import "./Main.css"
import ImageIcon from "../../../images/ImageIcon.js"

function Main(){
  const [file,setFile] = useState(null)
  const chooseFileHandle = async (e)=>{
    console.log(e.target.files[0]);

    const formData = new FormData();
    formData.append("image",e.target.files[0])
    setFile(e.target.files[0])

    try{
      const response = await fetch("/image",{
        method : "POST",
        // headers : {
          // "Content-Type" : "application/json"
        // },
        body : formData
      })
      const res = await response.json()
      console.log(res);
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="main-container">
      <div className="img-selector-container">
        <div className="image-load-container">
          <ImageIcon/>
        </div>
        <input 
          onChange={chooseFileHandle}
          // value={file}
          type="file"
          className="image-selector"
          accept={".jpg,.jpeg,.png"}
        />
      </div>
    </div>
  )
}

export default Main