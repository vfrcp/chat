export class WebSocketLogic{
  static connect(auth, socket, modal){
    if(auth){
      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data)
        console.log(msg)
        switch(msg.action){
          case "alert": if(window.location.pathname.split("/")[1] !== "chat"){modal(msg.body)}
            break
          default: 
        }
      }
      socket.send(JSON.stringify({action: "connect", username: auth.username, id: auth.id}))
      setTimeout(() => {
        console.log("sent")
        socket.send(JSON.stringify({action: "alert", recipientId: auth.id}))
      }, 4000)
    }
  }
  static sendAction(action, senderId, recipientId, socket){
    socket.send(JSON.stringify({action, senderId, recipientId}))
  }
}