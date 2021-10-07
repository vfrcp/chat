import { AuthApi } from "../api/auth"

export class AuthLogic{
  static async set(dispatch){
    try{
      const data = await AuthApi.get()
      if(data.message === "success"){
        dispatch({type: "SET_AUTH", payload: {id: data.id, username: data.username}})
        if(data.changeTokenA){
          localStorage.setItem("token", data.changeTokenA)
        }
      }else{throw Error}
    }catch(err){
      localStorage.removeItem("token")
      dispatch({type: "SET_AUTH", payload: null})
    }
  }
  static async loginOrRegister(data, type){
    let response = await AuthApi.loginOrRegister(data, type)
    console.log(response)
    if(response.message === "success"){
      localStorage.setItem("token", response.token)
      return response
    }else{
      return response
    }
  }
}