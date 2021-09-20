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
    const response = await User.login(req.body.username, req.body.password)
    const tokens = Tokens.create(response.id, response.username)
    await User.writeToken(response.id, tokens.tokenR)
    res.cookie("token", tokens.tokenR, {
      maxAge: 1000 * 3600 * 24 * 30,
      httpOnly: true 
    })
    res.send({id: response.id, username: response.username, token: tokens.tokenA})
  }catch(err){
    res.send({message: err})
  }
})

router.post("/logout", async (req, res) => {
  try{
    console.log("hee")
    const tokens = Tokens.verify(req.cookies.token)
    await User.logout(tokens.tokenR.id, req.cookies.token)
    res.clearCookie("token")
    res.send({message: "logouted"})
  }catch(err){

  }
})

router.post("/check", async (req, res) => {
  try{
    const tokens = Tokens.verify(null, req.body.tokenA)
    if(tokens.tokenA){
      res.send({token: req.body.tokenA, ...tokens.tokenA})
      console.log("Hell")
    }else{
      const tokens = Tokens.verify(req.cookies.token)
      console.log(tokens)
      if(tokens.tokenR){
        const newTokens = Tokens.create(tokens.tokenR.id, tokens.tokenR.username)
        await User.rewriteToken(tokens.tokenR.id, newTokens.tokenR, req.cookies.token)
        res.cookie("token", newTokens.tokenR, {
          maxAge: 1000 * 3600 * 24 * 30,
          httpOnly: true,
        })
        res.send({token: newTokens.tokenA, ...tokens.tokenR})
      }else{
        console.log("else")
        res.clearCookie("token")
        res.send({})
      }
    }
  }catch(err){
    console.log(err.message)
    res.clearCookie("token")
    res.send({})
  }
})

module.exports = router