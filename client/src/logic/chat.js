import { ChatApi } from "../api/chat"

export class ChatLogic{
  static async create(recipientId){
    const response = await ChatApi.create(recipientId)
    return response
  }
  static async get(chatId){
    const response = await ChatApi.get(chatId)
    return response
  }
  static async sendMessage(chatId, message){
    const response = await ChatApi.sendMessage(chatId, message)
    console.log(response)
    return response
  }
}