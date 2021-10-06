const {Router} = require("express")
const router = Router()

const User = require("../models/User")

router.get("/getAll", async (req, res) => {
  const response = await User.getAll()
  res.send({message: "success", ...response})
})

router.post("/getFriends", async (req, res) => {
  try{
    if(req.auth.status){
      const response = await User.get(req.auth.id, "friends")
      res.send({message: "success", ...response})
    }else{
      res.send({message: "auth error"})
    }
  }catch(err){
    res.clearCookie("token")
    res.send({message: err.message})
  }
})

router.post("/getGotReq", async (req, res) => {
  try{
    if(req.auth.status){
      const response = await User.get(req.auth.id, "gotReq")
      res.send({message: "success", ...response})
    }else{
      res.send({message: "auth error"})
    }
  }catch(err){
    res.clearCookie("token")
    res.send({message: err.message})
  }
})

router.post("/getSentReq", async (req, res) => {
  try{
    if(req.auth.status){
      const response = await User.get(req.auth.id, "sentReq")
      res.send({message: "success", changeTokenA: req.auth.changeTokenA, ...response})
    }else{
      res.send({message: "auth error"})
    }
  }catch(err){
    res.clearCookie("token")
    res.send({message: err.message})
  }
})

router.post("/getChats", async (req, res) => {
  try{
    if(req.auth.status){
      const response = await User.get(req.auth.id, "chats")
      res.send({message: "success", changeTokenA: req.auth.changeTokenA, ...response}) 
    }else{
      res.send({message: "auth error"})
    }
  }catch(err){
    res.clearCookie("token")
    res.send({message: err.message})
  }
})

router.post("/sendFriendReq", async (req, res) => {
  try{
    if(req.auth.status){
      await User.sendReq(req.auth.id, req.body.recipientId)
      res.send({message:"success", changeTokenA: req.auth.changeTokenA})
    }else{
      res.send({message: "auth error"})
    }
  }catch(err){
    res.send({message: err.message})
  }
})

router.post("/acceptFriendReq", async (req, res) => {
  try{
    if(req.auth.status){
      await User.acceptReq(req.auth.id, req.body.recipientId)
      res.send({message: "success", changeTokenA: req.auth.changeTokenA})
    }else{
      res.send({message: "auth error"})
    }
  }catch(err){
    res.send({message: err.message})
  }
})

router.post("/cancelFriendReq", async (req, res) => {
  try{
    if(req.auth.status){
      await User.cancelReq(req.auth.id, req.body.recipientId)
      res.send({message: "success", changeTokenA: req.auth.changeTokenA})
    }else{
      res.send({message: "wrong"})
    }
  }catch(err){
    res.send({message: err.message})
  }
})

router.post("/deleteFriend", async (req, res) => {
  try{
    if(req.auth.status){
      await User.deleteFriend(req.auth.id, req.body.recipientId)
      res.send({message: "success", changeTokenA: req.auth.changeTokenA})
    }else{
      res.send({message: "auth error"})
    }
  }catch(err){}
})

module.exports = router