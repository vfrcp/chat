import { AuthApi } from "../api/auth"

export class AuthLogic{
  static async set(dispatch){
    try{
      const response = await AuthApi.get()
      if(response.message === "success"){
        dispatch({type: "SET_AUTH", payload: {id: response.id, username: response.username}})
      }else{throw Error}
    }catch(err){
      localStorage.removeItem("token")
      dispatch({type: "SET_AUTH", payload: null})
    }
  }
  static async loginOrRegister(data, type, dispatch){
    try {
      let response = await AuthApi.loginOrRegister(data, type)
      if(response.message === "success"){
      localStorage.setItem("token", response.token)
      dispatch({type: "SET_AUTH", payload: {id: data.id, username: data.username}})
      return response.message
      }else{
        return response.message
      }
    }catch (err) {
      return "Something gone wrong"
    }
  }
}