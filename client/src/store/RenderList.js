const defaultState = null

export const RenderListReducer = (state = defaultState, action) =>{
  switch(action.type){
    case "SET_RENDERLIST": return action.payload
    default: return state 
  }
}