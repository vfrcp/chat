const defultState = {}

export const webSocketReducer = (state = defultState, action) => {
  switch(action.type){
    case "SET_SOCKET":
      return action.payload
    default:
      return state
  }
}