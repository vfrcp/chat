const {Router} = require("express")
const router = Router()

const {nanoid} = require("nanoid")

const Tokens = require("../models/Tokens")
const Chat = require("../models/Chat")
const User = require("../models/User")

router.post("/get/:id", async (req, res) => {
  try{
    const tokens = Tokens.verify(null, req.body.tokenA)
    if(tokens.tokenA){
      const response = await Chat.get(req.params.id)
      if(response.users.includes(tokens.tokenA.id)){
        const users = await User.getById(response.users)
        response.users = users
        res.send(response)
      }else{
        res.send({})
      }
    }else{
      res.send({})
    }
  }catch(err){
    console.log(err.message)
    res.send({})
  }
})
router.post("/send", (req, res) => {
  
})
router.post("/create", async (req, res) => {
  try{
    const tokens = Tokens.verify(null, req.body.tokenA)
    if(tokens.tokenA){
      const id = nanoid()
      const response = await Chat.create(id, tokens.tokenA.id, req.body.recipientId)
      await User.addChat(id, tokens.tokenA.id, req.body.recipientId)
      if(response.message === "success"){
        res.send({id})
      }
    }else{
      res.send({})
    }
  }catch(err){
    res.send({})
  }
})

module.exports = router