import { AuthApi } from "../api/auth"

export class WebSocketAndAuth{
  static connectWs(auth, socket, setModal){
    if(Object.keys(auth).length){
      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data)
        console.log(setModal)
        switch(msg.action){
          case "message": setModal(msg.body)
            break
          default: 
        }
      }
      socket.send(JSON.stringify({action: "connect", username: auth.username, id: auth.id}))
    }
  }
  static sendAction(type, senderId, recipientId, socket){
    socket.send(JSON.stringify({action: type, senderId, recipientId}))
  }
  static async authCheckAndInit(dispatch){
    try{
      const data = await AuthApi.checkToken()
      if(Object.keys(data).length){
        dispatch({type: "SET_AUTH", payload: {id: data.id, username: data.username}})
        localStorage.setItem("token", data.token)
      }else{throw Error}
    }catch(err){
      console.log(err.message)
      localStorage.removeItem("token")
      dispatch({type: "SET_AUTH", payload: {}})
    }
  }
}