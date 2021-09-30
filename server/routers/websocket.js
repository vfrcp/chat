const {Router} = require("express")
const router = Router()

const Websocket = require("../models/WebSocket")

router.ws("/", (ws, req) => {
  ws.on("message", msg => {
    msg = JSON.parse(msg)
    ws.senderId = msg.senderId
    console.log(msg)
    switch(msg.action){
      case "connect": Websocket.connect(ws, msg)
        break;
      default: Websocket.broadCast(ws.id, msg.recipientId, msg.action) 
    }
  })
})
router.ws("/chat", (ws, req) => {

})

module.exports = router