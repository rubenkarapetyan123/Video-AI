import express from "express";
import { LOGIN, REGISTER } from "./constants/routes-constants.js";
import fs from "fs"
import { nanoid } from "nanoid";
import bcrypt from "bcrypt"
import { log } from "console";

const app = express()
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.get("/test",(req,res)=>{
  res.send({
    access : true,
    type : "test"
  })
})


app.post(REGISTER,async (req,res)=>{
  const { username, email, password } = req.body
  const users = JSON.parse(fs.readFileSync("./database/users.json",{encoding : "utf8",flag : "r"}))
  let isValidEmail = true
  for(let i in users){
    if(users[i].email === email){
      isValidEmail = false
    }
  }
  if(!isValidEmail){
    return res.send({
      access : false,
      message : "email already used"
    })
  }

  const id = nanoid(8)
  users[id] = {
    username,
    email,
    password : await bcrypt.hash(password,10)
  }

  fs.writeFileSync("./database/users.json",JSON.stringify(users,undefined,2))

  res.send({
    access : true,
    username,
    email,
    id
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