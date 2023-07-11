import express from "express";
import { LOGIN, REGISTER } from "./constants/routes-constants.js";

const app = express()
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.get("/test",(req,res)=>{
  res.send({
    access : true,
    type : "test"
  })
})


app.post(REGISTER,(req,res)=>{
  const { username, email, password } = req.body
  console.log(username, email, password);
  res.send({
    access : true
  })
})

app.post(LOGIN,(req,res)=>{
  const { email, password } = req.body
  console.log(email, password);
  res.send({
    access : true
  })
})

app.listen(process.env.PORT || 5000,()=>{
  console.log("server started on "+process.env.PORT+" port");
})