const {Router} = require("express")
const router = Router()

const {nanoid} = require("nanoid")

const Chat = require("../models/Chat")
const User = require("../models/User")

router.post("/get/:id", async (req, res) => {
  try{
    if(req.auth.status){
      const response = await Chat.get(req.params.id)
      if(response.users.includes(req.auth.id)){
        const users = await User.getById(response.users)
        response.users = users
        res.send({message: "success", changeTokenA: req.auth.changeTokenA, body: response})
      }else{
        res.send({message: "wrong"})
      }
    }else{
      res.send({message: "unauth"})
    }
  }catch(err){
    res.send({message: err.message})
  }
})

router.post("/sendMessage", async (req, res) => {
  try{
    if(req.auth.status){
      await Chat.sendMessage(req.body.chatId, req.auth.id, req.body.message)
      res.send({message: "success", changeTokenA: req.auth.changeTokenA})
    }else{
      res.send({message: "unauth"})
    }
  }catch(err){
    res.send({message: err.message})
  }
})

router.post("/create", async (req, res) => {
  try{
    if(req.auth.status){
      const id = nanoid()
      await Chat.create(id, req.auth.id, req.body.recipientId)
      await User.addChat(id, req.auth.id, req.body.recipientId)
      res.send({body: {id}, message: "success", changeTokenA: req.auth.changeTokenA})
    }else{
      res.send({message: "unauth"})
    }
  }catch(err){
    res.send({message: err.message})
  }
})

module.exports = router