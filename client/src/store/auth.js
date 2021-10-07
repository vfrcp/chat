const defaultState = null

export const authReducer = (state = defaultState, action) => {
  switch(action.type){
    case "SET_AUTH": if(action.payload){return {...action.payload}}else{return action.payload}
    default: return state
  }
}