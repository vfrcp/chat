const express = require("express")
const cors = require("cors")
const cookie = require('cookie-parser')
const Db = require("mongoose")
require("dotenv").config()
const App = express()
const expressWs = require('express-ws')(App)
const aWss = expressWs.getWss()
module.exports = aWss

App.use(cors({
  credentials: true,
  preflightContinue: true,
  origin: process.env.LINK_CLIENT
}))
App.use(express.json())
App.use(cookie())
App.use(express.urlencoded({extended: true}))

const auth = require("./routers/auth")
const users = require("./routers/users")
const webSoket = require("./routers/webSocket")
const err404 = require("./routers/err404")

App.use("/auth", auth)
App.use("/users", users)
App.use("/ws", webSoket)
App.use(err404)

const start = async (PORT = 5000) => {
  try{
    await Db.connect("mongodb+srv://1111:1111@cluster0.z2qp1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    App.listen(PORT, () => {
      console.log(`server has been started in ${PORT} port`)
    })
  }catch(err){
    console.log("failed to start server or conect to database")
  }
}
start(process.env.PORT)
