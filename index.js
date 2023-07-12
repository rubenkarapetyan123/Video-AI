import express from "express";
import { IMAGE, LOGIN, REGISTER } from "./constants/routes-constants.js";
import fs from "fs"
import { nanoid } from "nanoid";
import bcrypt from "bcrypt"
import { log } from "console";
import jwt from "passport-jwt"
import passport from "passport"
import multer from "multer";
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

// passport.use(new JwtStrategy(config, function(payload, done) {
  // const users = fs.readFileSync("./database/users.json",{encoding : "utf8", flag : "r"})
  // const user = users[payload.sub]
  // if(!user){
  //   return done()
  // }
  // User.findOne({id: jwt_payload.sub}, function(err, user) {
  //     if (err) {
  //         return done(err, false);
  //     }
  //     if (user) {
  //         return done(null, user);
  //     } else {
  //         return done(null, false);
  //         // or you could create a new account
  //     }
  // })
// }))

app.post(IMAGE,upload.single("image"),(req,res)=>{
  console.log(req.file);
  res.send({
    access : true,
    img : req.file.filename
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