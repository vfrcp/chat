const {Router} = require("express")
const router = Router()

const User = require("../models/User")

router.get("/getAll", async (req, res) => {
  const response = await User.getAll()
  res.send(response)
})

module.exports = router