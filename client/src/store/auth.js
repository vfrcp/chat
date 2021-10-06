const defaultState = null

export const authReducer = (state = defaultState, action) => {
  switch(action.type){
    case "SET_MODAL": return {...action.payload}
    default: return state
  }
}