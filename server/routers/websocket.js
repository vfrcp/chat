const {Router} = require("express")
const router = Router()

router.ws("/", (ws, req) => {
  ws.on("message", msg => {
    msg = JSON.parse(msg)
    ws.senderId = msg.senderId
    switch(msg.action){
      
    }
  })
})
router.ws("/chat", (ws, req) => {

})

module.exports = router