const {Router} = require("express")
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
    res.send({id, username: req.body.username, token: tokens.tokenA, message: "success", changeTokenA: req.auth.ChangeTokenA})
  }catch(err){
    res.send({message: err.message, changeTokenA: req.auth.ChangeTokenA})
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
    res.send({id: response.id, username: response.username, token: tokens.tokenA, message: "success", changeTokenA: req.auth.ChangeTokenA})
  }catch(err){
    res.send({message: err.message, changeTokenA: req.auth.ChangeTokenA})
  }
})

router.post("/logout", async (req, res) => {
  try{
    const tokens = Tokens.verify(req.cookies.token)
    await User.logout(tokens.tokenR.id, req.cookies.token)
    res.clearCookie("token")
    res.send({message: "success", changeTokenA: req.auth.ChangeTokenA})
  }catch(err){}
})

module.exports = router