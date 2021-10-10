import { fetchWrap } from "./fetchWrap"

export class  UserApi{
  static async getAll(){
    let response = await fetchWrap("users/getAll")
    response = await response.json()
    return response
  }
  static async getProperty(property){
    let response = await fetchWrap("users/getProperty", {property})
    response = await response.json()
    return response
  }
  static async sendAction(recipientId, action){
    let response = await fetchWrap("users/sendAction", {recipientId, action})
    response = await response.json()
    return response
  }
}