const {Router} = require("express")
const router = Router()

const User = require("../models/User")

router.post("/getAll", async (req, res) => {
  const response = await User.getAll()
  res.send({message: "success", body: response, changeTokenA: req.auth.changeTokenA})
})

router.post("/getProperty", async (req, res) => {
  try{
    if(req.auth.status){
      const response = await User.getProperty(req.auth.id, req.body.property)
      res.send({message: "success", body: response, changeTokenA: req.auth.changeTokenA})
    }else{
      res.send({message: "unauth"})
    }
  }catch(err){
    res.send({message: err.message, changeTokenA: req.auth.changeTokenA})
  }
})

router.post("/sendAction", async (req, res) => {
  try{
    if(req.auth.status){
      switch(req.body.action){
        case "deleteFriend": await User.deleteFriend(req.auth.id, req.body.recipientId)
          break
        case "cancelReq": await User.cancelFriendReq(req.auth.id, req.body.recipientId)
          break
        case "acceptReq": await User.acceptFriendReq(req.auth.id, req.body.recipientId)
          break
        case "sendReq": await User.sendFriendReq(req.auth.id, req.body.recipientId) 
      }
      res.send({message: "success", changeTokenA: req.auth.changeTokenA})
    }else{
      res.send({message: "unauth"})
    }
  }catch(err){
    res.send({message: err.message, changeTokenA: req.auth.changeTokenA})
  }
})

module.exports = router