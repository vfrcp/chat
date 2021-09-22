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
      const response = User.getFriends(tokens.tokenA.id)
      res.send(response)
    }else{
      res.send({})
    }
  }catch(err){
    res.clearCookie("token")
    res.send({})
  }
})

module.exports = router