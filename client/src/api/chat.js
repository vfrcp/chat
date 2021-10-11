import { fetchWrap } from "./fetchWrap";

export class ChatApi{
  static async create(recipientId){
    let response = await fetchWrap("chat/create", {recipientId})
    response = await response.json()
    return response
  }
  static async get(chatId){
    let response = await fetchWrap(`chat/get/${chatId}`)
    response = await response.json()
    return response
  }
  static async sendMessage(chatId, message){
    let response = await fetchWrap("chat/sendMessage", {chatId, message})
    response = await response.json()
    return response
  }
}