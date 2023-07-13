import { useEffect, useState } from "react"
import "./Main.css"
import ImageIcon from "../../../images/ImageIcon.js"
import { getToken } from "../../../utils/api-utils"
import { FadeLoader } from "react-spinners"

function Main(){
  const [file,setFile] = useState(null)
  const [result,setResult] = useState(null)
  const [loading,setLoading] = useState(false)
  const chooseFileHandle = async (e)=>{

    const formData = new FormData();
    formData.append("image",e.target.files[0])

    try{
      setLoading(true)
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
      setLoading(false)
    }catch(err){
      setLoading(false)
      console.log(err);
    }
  }

  useEffect(()=>{
    async function getResponse(){
      if(file){
        try{
          setLoading(true)
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
          setLoading(false)
        }catch(err){
          setLoading(false)
          console.log(err);
        }
      }
    }
    getResponse()

  },[file])

  return (
    <div className="main-container">
      {loading ? 
        <div className="loading-container">
          <FadeLoader/>
        </div>
       : null}
      <div className="img-selector-container">
        <div className="image-load-container">
          {file ? <img src={file} alt="image" className="main-image"/> : <ImageIcon/>}
        </div>
        <input 
          onChange={chooseFileHandle}
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