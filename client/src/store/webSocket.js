import "../vars"
const defaultState = new WebSocket(`ws://${global.serverLink.split("//")[1]}/ws`)

export const webSocketReducer = (state = defaultState, action) => {
  switch(action.type){
    case "SET_SOCKET": return action.payload
    default: return state
  }
}