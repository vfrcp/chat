const {Router} = require("express")
const {nanoid} = require("nanoid")
const router = Router()

const Tokens = require("../models/Tokens")
const User = require("../models/User")

router.post("/get", async (req, res) => {
  try{
    if(req.auth.status){
      const {id, username} = req.auth
      res.send({id, username, message: "success", changeTokenA: req.auth.changeTokenA})
    }else{
      res.send({message: "not auth"})
    }
  }catch(err){
    res.send({message: err.message})
  }
})

router.post("/register", async (req, res) => {
  try{
    const id = nanoid()
    const tokens = Tokens.create(id, req.body.username)
    await User.register(id, req.body.username, req.body.email, req.body.password, tokens.tokenR)
    res.cookie("token", tokens.tokenR, {
      maxAge: 1000 * 3600 * 24 * 30,
      httpOnly: true 
    })
    const changeTokenA = req.auth ? req.auth.changeTokenA : false
    res.send({id, username: req.body.username, token: tokens.tokenA, message: "success", changeTokenA})
  }catch(err){
    res.send({message: err.message})
  }
})

router.post("/login", async (req, res) => {
  try{
    const response = await User.login(req.body.username, req.body.password)
    const tokens = Tokens.create(response.id, response.username)
    await User.writeToken(response.id, tokens.tokenR)
    res.cookie("token", tokens.tokenR, {
      maxAge: 1000 * 3600 * 24 * 30,
      httpOnly: true 
    })
    const changeTokenA = req.auth ? req.auth.changeTokenA : false
    res.send({id: response.id, username: response.username, token: tokens.tokenA, message: "success", changeTokenA})
  }catch(err){
    res.send({message: err.message})
  }
})

router.post("/logout", async (req, res) => {
  try{
    const tokens = Tokens.verify(req.cookies.token)
    await User.logout(tokens.tokenR.id, req.cookies.token)
    res.clearCookie("token")
    res.send({message: "success"})
  }catch(err){}
})

module.exports = router