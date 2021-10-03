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
    console.log("h")
    await chat.create({id, users: usersId, messages:[]})
    return({message: "success"})
  }
  static async get(id){
    const candidate = chat.findOne({id})
    if(candidate){
      return candidate
    }else{
      throw "Chat not exist"
    }
  }
}

module.exports = Chat