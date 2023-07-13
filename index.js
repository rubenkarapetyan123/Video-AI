import express from "express";
import { IMAGE, LOGIN, REGISTER } from "./constants/routes-constants.js";
import fs from "fs"
import { nanoid } from "nanoid";
import bcrypt from "bcrypt"
import { log } from "console";
import jwt from "passport-jwt"
import passport from "passport"
import multer from "multer";
import { PythonShell } from 'python-shell';

const { JwtStrategy, ExtractJwt } = jwt

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + nanoid(8) + ".png")
  }
})

const upload = multer({ storage : storage })


const app = express()

app.use(express.static("./images/"))
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(passport.initialize())

const config = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : process.env.JWT_SECRET,
}

passport.use(new JwtStrategy(config, function(payload, done) {
  try {
    const users = fs.readFileSync("./database/users.json",{encoding : "utf8", flag : "r"})
    const user = users[payload.sub]
    if (user) {
      return done(null, user);
    }else {
      return done(null, false);
    }
  }catch(err){
    if (err) {
      return done(err, false);
    }
    console.log(err)
  }
}))

app.post(IMAGE,upload.single("image"),(req,res)=>{
  res.send({
    access : true,
    img : req.file.filename
  })
})

app.get(IMAGE+"/:name",(req,res)=>{
  const { name } = req.params
  PythonShell.run("./python-scripts/Terminator/run.py",{
    args : [name]
  }).then(result=>{
    res.send({
      access : true,
      message : result[0]
    })
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
  // PythonShell.runString(`print("hello")`,null).then(result=>{
  //   console.log(result)
  // })
  // const { email, password } = req.body
  // console.log(email, password);
  // res.send({
  //   access : true
  // })
})

app.listen(process.env.PORT || 5000,()=>{
  console.log("server started on "+process.env.PORT+" port");
})