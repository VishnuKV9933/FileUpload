const express= require("express");
const app=express()
const mongoose = require("mongoose");
const dotenv=require("dotenv");
const helmet =require("helmet");
const morgan =require("morgan");
const cors= require("cors")
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
     
//    let fname=null;
//          if(file.mimetype=="image/jpeg"){fname=Date.now()+".jpeg"}
//          if(file.mimetype=="image/png"){fname=Date.now()+".png"}
//          if(file.mimetype=="image/jpeg"){fname=Date.now()+".jpeg"}
//          if(file.mimetype=="video/mp4"){fname=Date.now()+".mp4"}
//          if(file.mimetype=="application/pdf"){fname=Date.now()+".pdf"}
    cb(null,Date.now()+file.originalname)
       
    }
});
 const upload = multer({ storage: storage ,

    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "video/mp4" 
        || file.mimetype == "image/jpeg"|| file.mimetype ==  "application/pdf") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg, .jpeg, .jpeg amd .mp4 format allowed!'));
        }
    }
});


const fs = require('fs')
const path = require('path');
dotenv.config();
    

app.use(express.json());
app.use(helmet());
app.use(morgan("common"))
const fileSchema= require("./schema/fleScema")

app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST'],
    credentials:true
})),

app.get("/",async(req,res)=>{
   
        let files = await fileSchema.find()
        res.json(files)
})

app.get("/download/:id",(req,res)=>{ 

    let file =req.params.id

     res.download(`./uploads/${file}`)

})

app.post('/upload',upload.array("image"),async(req,res)=>{
    
    const fname=req.files.map((file)=>{
            return file.filename
    })
    console.log(fname);
     const file = new fileSchema({
        filename:req.body.name,
        file:fname[0]
     })
     await file.save().then((res)=>{
        console.log(res);
     })
})

mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("connected to mongoose");
});

app.listen(8800,()=>{
    console.log("backend server is running");
})