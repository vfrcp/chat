export class WebSocketLogic{
  static connect(auth, socket, modal, setNewMessage){
    if(auth){
      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data)
        switch(msg.action){
          case "alert": modal(msg.body)
            break
            // обяснение работы находиться в Chat.jsx
          case "message": 
            try{
              //Try catch чтобы react не ругался
              setNewMessage(msg.body)
            }catch(err){}
            break
          default: 
        }
      }
      setTimeout(() => {
        socket.send(JSON.stringify({action: "connect", username: auth.username, id: auth.id}))
      }, 1000)
    }
  }
  static sendAction(action, senderId, recipientId, socket, body){
    socket.send(JSON.stringify({action, senderId, recipientId, body}))
  }
}