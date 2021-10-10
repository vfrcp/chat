import { fetchWrap } from "./fetchWrap"

export class AuthApi{
  static async get(){
    let response = await fetchWrap("auth/get")
    response = await response.json()
    return response
  }
  static async loginOrRegister(data, type){
    let response = await fetchWrap(`auth/${type}`, data)
    response = await response.json()    
    return response
  }
  static async logout(){
    await fetchWrap("auth/logout")
    localStorage.removeItem("token")
  }
}
