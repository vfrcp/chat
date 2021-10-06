export class WebSocketLogic{
  static connect(auth, socket){
    if(auth){
      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data)
        switch(msg.action){
          case "alert": if(window.location.pathname.split("/")[1] !== "chat"){}
            break
          default: 
        }
      }
      socket.send(JSON.stringify({action: "connect", username: auth.username, id: auth.id}))
    }
  }
  static sendAction(action, senderId, recipientId, socket){
    socket.send(JSON.stringify({action, senderId, recipientId}))
  }
}