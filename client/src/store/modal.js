const defaultState = ""

export const modalReducer = (state = defaultState, action) => {
  switch(action.type){
    case "SET_MODAL": return action.payload
    default: return state
  }
} 