import React,{useEffect,useState} from 'react'
import Axios from "axios";
import FileDownload from "js-file-download"

function Download() {
  const [datas,setdata]=useState([])
  const array ="[1,2,3,4,5,6]"

 
console.log(datas)

  useEffect(()=>{
    Axios.get("http://localhost:8800/").then((res)=>{
      setdata(res.data)
    })  
  },[]) 

  console.log("a")



  const download =(file)=>{
  
  
  Axios.get(`http://localhost:8800/download/${file}`,
  {responseType:"blob"}
  ).then((res)=>{   
   {res.data.type === "image/jpeg"? FileDownload(res.data,"dawnload.jpeg"):
   res.data.type === "image/jpg"? FileDownload(res.data,"dawnload.jpg"):
   res.data.type === "application/pdf" ? FileDownload(res.data,"dawnload.pdf"):
   res.data.type === "video/mp4" ? FileDownload(res.data,"dawnload.mp4"):
   res.data.type === "image/png"? FileDownload(res.data,"dawnload.png"):
   console.log("error");}
  
  })
  } 
  return (
    <div>
    
    {datas.map((elem)=>{
        let b= <div><h1> {elem.filename}</h1>  <button  onClick={()=>download(elem.file)}>download</button></div>
        return b
  })}

    
    </div>
  )
}

export default Download
