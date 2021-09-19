const {Router, response} = require("express")
const {nanoid} = require("nanoid")
const router = Router()

const Tokens = require("../models/Tokens")
const User = require("../models/User")

router.post("/register", async (req, res) => {
  try{
    const id = nanoid()
    const tokens = Tokens.create(id, req.body.username)
    await User.register(id, req.body.username, req.body.email, req.body.password, tokens.tokenR)
    res.cookie("token", tokens.tokenR, {
      maxAge: 1000 * 3600 * 24 * 30,
      httpOnly: true 
    })
    res.send({id, username: req.body.username, token: tokens.tokenA})
  }catch(err){
    res.send({message: err})
  }
})

router.post("/login", async (req, res) => {
  try{
    const response = await User.login()
    if(response.message === "success"){
      res.send({id: response.id, username: response.username})
    }else{
      res.send({message: response.message})
    }
    res.send({message: "done"})
  }catch(err){
    res.send({message: err})
  }
})

router.post("/logout", async (req, res) => {
  try{

  }catch(err){

  }
})

router.post("/check", async (req, res) => {
  try{
    const tokens = Tokens.verify(null, req.body.tokenA)
    if(tokens.tokenA){
      res.send({token: req.body.tokenA, ...tokens.tokenA})
    }else{
      const tokens = Tokens.verify(req.cookies.token)
      if(tokens.tokenR){
        const newTokens = Tokens.create({id: tokens.tokenR.id, username: tokens.tokenR.username})
        await User.rewriteToken(tokens.tokenR.id, newTokens, req.cookies.token)
        res.cookie("token", newTokens.tokenR, {
          maxAge: 1000 * 3600 * 24 * 30,
          httpOnly: true,
        })
        res.send({token: newTokens.tokenA, ...tokens.tokenA})
      }
    }
  }catch(err){
    res.send({})
  }
})

module.exports = router