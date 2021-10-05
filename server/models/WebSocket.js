const aWss = require("../App")

class WebSocket{
  static connect(ws, msg){
    ws.id = msg.id
    ws.username = msg.username
    ws.send(JSON.stringify(msg))
  }
  static broadCast(senderId, recipientId, did){
    let username
    let action
    switch (did) {
      case "sentFriendReq": action = "Sent a friend request"
        break
      case "cancelFriendReq": action = "Canceled a friend request"
        break
      case "acceptFriendReq": action = "Accepted a friend request"
        break
      case "deleteFriend": action = "Delete you from friends"
        break
      case "sentMessage": action = "sent you a message"
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
        client.send(JSON.stringify({action: "alert", body: `User ${username} ${action}`}))
      }
    })
  }
}
module.exports = WebSocket