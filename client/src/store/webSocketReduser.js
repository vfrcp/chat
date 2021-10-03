import "../vars"
const defultState = new WebSocket(`ws://${global.serverLink.split("//")[1]}/ws`)

export const webSocketReducer = (state = defultState, action) => {
  switch(action.type){
    case "SET_SOCKET":
      return {...action.payload}
    default:
      return state
  }
}