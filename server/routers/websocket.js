const {Router} = require("express")
const router = Router()

const Websocket = require("../models/WebSocket")

router.ws("/", (ws, req) => {
  console.log()
  ws.on("message", msg => {
    msg = JSON.parse(msg)
    console.log(msg)
    switch(msg.action){
      case "connect": Websocket.connect(ws, msg)
        break
      default: Websocket.broadCast(ws.id, msg.recipientId, msg.action) 
    }
  })
})

router.ws("/chat", (ws, req) => {
  ws.on("message", msg => {
    msg = JSON.parse(msg)
    console.log(msg)
    switch(msg.action){
      case "connect": Websocket.connect(ws, msg)
        break
      case "sentChatMessage": Websocket.broadCast(msg.senderId, msg.recipientId, msg.action)
      default: Websocket.broadCast(ws.id, msg.recipientId, msg.action)
    }
  })
})

module.exports = router