const defultState = {}

export const authReducer = (state = defultState, action) => {
  switch(action.type){
    case "SET_AUTH":
      return {...action.payload}
    default:
      return state
  }
}
