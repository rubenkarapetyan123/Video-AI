import express from "express";

const app = express()

app.get("/test",(req,res)=>{
  res.send({
    access : true,
    type : "test"
  })
})

app.listen(process.env.PORT || 3002,()=>{
  console.log("server started on "+process.env.PORT+" port");
})