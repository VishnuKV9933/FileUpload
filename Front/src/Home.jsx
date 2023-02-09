import axios from 'axios'
import React,{useState} from 'react'

function Home() {
    const [files,setFile]=useState()
    const [name,setName]=useState()
    const submit=(e)=>{
   e.preventDefault()
console.log(files[0]);
   const data= new FormData()   
   data.append("image",files[0])
   data.append("name",name)

   axios.post("http://localhost:8800/upload",data, 

).then((data)=>{console.log("data arrieved");}).catch((e)=>{console.log(e);})
    }
  return (
    <div>
        <form onSubmit={submit} enctype="multipart/form-data" >
            <input onChange={(e)=>{setName(e.target.value)}}
             name='name' type="text" />
        <input type="file" name='image'
        // accept='.jpj'
         onChange={(e)=>{setFile(e.target.files)}}/>
        <button type='submit' >submit</button>
        </form>
    </div>
  )
}

export default Home
