const {Router} = require("express")
const router = Router()

const User = require("../models/User")
const Tokens = require("../models/Tokens")

router.get("/getAll", async (req, res) => {
  const response = await User.getAll()
  res.send(response)
})

router.post("/getFriends", async (req, res) => {
  try{
    const tokens = Tokens.verify(null, req.body.tokenA)
    if(tokens.tokenA){
      const response = await User.get(tokens.tokenA.id, "friends")
      res.send(response)
    }else{
      res.send({})
    }
  }catch(err){
    res.clearCookie("token")
    res.send({})
  }
})
router.post("/getGotedReq", async (req, res) => {
  try{
    const tokens = Tokens.verify(null, req.body.tokenA)
    if(tokens.tokenA){
      const response = await User.get(tokens.tokenA.id, "gotedReq")
      res.send(response)
    }else{
      res.send({})
    }
  }catch(err){
    res.clearCookie("token")
    res.send({})
  }
})
router.post("/getSendedReq", async (req, res) => {
  try{
    const tokens = Tokens.verify(null, req.body.tokenA)
    if(tokens.tokenA){
      const response = await User.get(tokens.tokenA.id, "sendedReq")
      res.send(response)
    }else{
      res.send({})
    }
  }catch(err){
  res.send({})
  }
})
router.post("/sendReq", async (req, res) => {
  try{
    const tokens = Tokens.verify(null, req.body.tokenA)
    if(tokens.tokenA){
      await User.sendReq(tokens.tokenA.id, req.body.recipientId)
      res.send({message:"success"})
    }else{
      res.send({})
    }
  }catch(err){
    res.send({})
  }
})
router.post("/acceptReq", async (req, res) => {
  try{
    const tokens = Tokens.verify(null, req.body.tokenA)
    if(tokens.tokenA){
      await User.acceptReq(tokens.tokenA.id, req.body.recipientId)
      res.send({message: "success"})
    }else{
      res.send({})
    }
  }catch(err){
    res.send({})
  }
})
router.post("/cancelReq", async (req, res) => {
  try{
    const tokens = Tokens.verify(null, req.body.tokenA)
    if(tokens.tokenA){
      await User.cancelReq(tokens.tokenA.id, req.body.recipientId)
      res.send({message: "success"})
    }else{
      res.send({})
    }
  }catch(err){
    res.send({})
  }
})
router.post("/deleteFriend", async (req, res) => {
  try{
    const tokens = Tokens.verify(null, req.body.tokenA)
    if(tokens.tokenA){
      await User.deleteFriend(tokens.tokenA.id, req.body.recipientId)
      res.send({message: "success"})
    }else{
      res.send({})
    }
  }catch(err){

  }
})
module.exports = router