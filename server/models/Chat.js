const Db = require("mongoose")
const {Schema} = require("mongoose")

const chatSchema = new Schema({
  id: String,
  users: Array,
  messages: Array
}, { versionKey: false })

const chat = Db.model("Chat", chatSchema)

class Chat{
  static async create(id, ...usersId){
    await chat.create({id, users: usersId, messages:[]})
    return {message: "success"}
  }
  static async get(id){
    const candidate = chat.findOne({id})
    if(candidate){
      return candidate
    }else{
      throw {message: "Chat not exist"}
    }
  }
  static async sendMessage(chatId, senderId, message){
    const candidate = await chat.findOne({id: chatId})
    console.log(candidate.users)
    if(candidate && candidate.users.includes(senderId)){
      candidate.messages.push(message)
      await candidate.save()
      return "success"
    }else{
      throw {message: "Chat not exist"}
    } 
  }
}

module.exports = Chat