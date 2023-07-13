import { useEffect, useState } from "react"
import FormInput from "../../usable/FormInput"
import "./Main.css"
import ImageIcon from "../../../images/ImageIcon.js"
import { getToken } from "../../../utils/api-utils"

function Main(){
  const [file,setFile] = useState(null)
  const [result,setResult] = useState(null)
  const chooseFileHandle = async (e)=>{

    const formData = new FormData();
    formData.append("image",e.target.files[0])

    try{
      const token = getToken()
      const response = await fetch("/image",{
        method : "POST",
        headers : {
          "Authorization" : `Bearer ${token}`
        },
        body : formData
      })
      const res = await response.json()
      setFile(res.img)
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    async function getResponse(){
      if(file){
        try{
          const token = getToken()
          const response = await fetch("/image/"+file,{
            method : "GET",
            headers : {
              "Authorization" : `Bearer ${token}`
            },
          })
          const res = await response.json()
          if(res.access){
            setResult(res.message)
          }
        }catch(err){
          console.log(err);
        }
      }
    }
    getResponse()

  },[file])

  return (
    <div className="main-container">
      <div className="img-selector-container">
        <div className="image-load-container">
          {file ? <img src={file} alt="image" className="main-image"/> : <ImageIcon/>}
        </div>
        <input 
          onChange={chooseFileHandle}
          // value={file}
          type="file"
          className="image-selector"
          accept={".jpg,.jpeg,.png"}
        />
      </div>
      {result ? <div className="result-container">
        <p>{result}</p>
      </div> : null}
    </div>
  )
}

export default Main