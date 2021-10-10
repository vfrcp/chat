import { UserApi } from "../api/user";

export class UserLogic{
  static async getAll(){
    try{
      const response = await UserApi.getAll()
      if(response.message === "success"){
        return response.body
      }else{
        throw Error
      }
    }catch(err){
      return []
    }
  }
  static async getProperty(property){
    try{
      const response = await UserApi.getProperty(property)
      if(response.message === "success"){
        return response.body
      }else{
        throw Error
      }
    }catch(err){
      return []
    }
  }
  static async sendAction(recipientId, action){
    try{
      const response = await UserApi.sendAction(recipientId, action)
      return response
    }catch(err){

    }
  }
}