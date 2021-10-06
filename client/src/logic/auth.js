import { AuthApi } from "../api/auth"

export class AuthLogic{
  static async set(dispatch){
    try{
      const data = await AuthApi.get()
      if(data.message === "success"){
        dispatch({type: "SET_AUTH", payload: {id: data.id, username: data.username}})
        localStorage.setItem("token", data.token)
      }else{throw Error}
    }catch(err){
      console.log(err.message)
      localStorage.removeItem("token")
      dispatch({type: "SET_AUTH", payload: null})
    }
  }
}