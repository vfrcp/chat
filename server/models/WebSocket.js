const aWss = require("../App")

class WebSocket{
  static connect(ws, msg){
    ws.id = msg.id
    ws.username = msg.username
    ws.send(JSON.stringify(msg))
  }
  static broadCast(senderId, recipientId, action){
    let username
    let body = "test"
    switch (action) {
      case "sentReq": body = "Sent a friend request"
        break
      case "cancelReq": body = "Canceled a friend request"
        break
      case "acceptReq": body = "Accepted a friend request"
        break
      case "deleteFriend": body = "Delete you from friends"
        break
      case "sentMessage": body = "sent you a message"
      default:
        break
    }
    aWss.clients.forEach(client => {
      if(client.id === senderId){
        username = client.username
      }
    })
    aWss.clients.forEach(client => {
      if(client.id === recipientId){
        client.send(JSON.stringify({action: "alert", body: `User ${username} ${body}`}))
      }
    })
  }
}
module.exports = WebSocket