const Db = require("mongoose")
const {Schema} = require("mongoose")

const Tokens = require("./Tokens")

const userSchema = new Schema({
  id: String, 
  username: String, 
  email: String, 
  password: String,
  friends: Array,
  gotedReq: Array,
  sendedReq: Array,
  chats: Array,
  tokens: Array,
}, { versionKey: false })

const user = Db.model("User", userSchema)

class User{
  static async getAll(){
    const users = await user.find({})
    const response = users.map(user => {
      return {id: user.id, username: user.username, friends: user.friends, gotedReq: user.gotedReq, sendedReq: user.sendedReq, chats: user.chats}
    })
    return response
  }
  static async getById(id){
    if(typeof id === "object"){
      const response = await user.find({id: {$in: id}})
      const users = []
      for(const user of response){
        const res = {id: user.id, username: user.username, friends: user.friends, gotedReq: user.gotedReq, sendedReq: user.sendedReq, chats: user.chats}
        users.push(res)
      }
      return users
    }else{
      const response = await user.findOne({id})
      if(response){
        return {id: response.id, username: response.username, friends: response.friends, gotedReq: response.gotedReq, sendedReq: response.sendedReq, chats: response.chats}
      }else{
        throw "User not exist"
      }
    }
  }
  // From user property
  static async get(id, type){
    const candidate = await user.findOne({id})
    if(candidate){
      const data = candidate[type]
      if(type === "chats"){
        for(const chat of data){
          const users = []
          const usersRaw = await user.find({id: {$in: chat.users}}) 
          for(const user of usersRaw){
            const res = {id: user.id, username: user.username, friends: user.friends, gotedReq: user.gotedReq, sendedReq: user.sendedReq, chats: user.chats}
            users.push(res)
          }
          chat.users = users
        }
        return data
      }else{
        return await user.find({id: {$in: data}})
      }
    }else{
      throw "User not exist"
    }
  }

  static async register(id, username, email, password, tokenR){
    const withUsername = await user.findOne({username})
    const withEmail = await user.findOne({email})
    if(withUsername || withEmail){
      throw "User alredy exist"
    }
    const tokens = [tokenR]
    await user.create({id, username, email, password, tokens})
    return {message: "success"}
  }
  static async login(username, password){
    const candidate = await user.findOne({username})
    if(candidate){
      if(candidate.password === password){
        candidate.tokens.forEach((token, index) => {
          const tokens = Tokens.verify(token)
          if(!tokens.tokenR){
            candidate.tokens.splice(index, 1)
          }
        })
        await candidate.save()
        return{id: candidate.id, username: candidate.username, message: "success"}
      }else{
        throw "Wrong password"
      }
    }else{
      throw "User not exist"
    }
  }
  static async logout(id, tokenR){
    const candidate = await user.findOne({id})
    if(candidate){
      candidate.tokens.forEach((token, index) => {
        if(token === tokenR){
          candidate.tokens.splice(index, 1)
        }
      })
      await candidate.save()
    }
  }
  static async writeToken(id, token){
    const candidate = await user.findOne({id})
    if(candidate){
      candidate.tokens.push(token)
      await candidate.save()
      return {message: "success"}
    }else{
      throw "User not exist"
    }
  }
  static async rewriteToken(id, Newtoken, prewToken){
    const candidate = await user.findOne({id})
    if(candidate){
      candidate.tokens.forEach((token, index) => {
        if(token === prewToken){
          candidate.tokens.splice(index, 1)
        }
      })
      candidate.tokens.push(Newtoken)
      await candidate.save()
      return {message: "success"}
    }else{
      throw "User not exist"
    }
  }
  static async sendReq(senderId, recipientId){
    const sender = await user.findOne({id: senderId})
    const recipient = await user.findOne({id: recipientId})
    if(sender && recipient){
      sender.sendedReq.push(recipientId),
      recipient.gotedReq.push(senderId)
      await sender.save()
      await recipient.save()
    }else{
      throw "One of users not exist"
    }
  }
  static async acceptReq(senderId, recipientId){
    const sender = await user.findOne({id: senderId})
    const recipient = await user.findOne({id: recipientId})
    if(sender && recipient){
      recipient.sendedReq.forEach( (req, index) => {
        if(req === senderId){
          recipient.sendedReq.splice(index, 1)
        }
      })
      sender.gotedReq.forEach( (req, index) => {
        if(req === recipientId){
          sender.gotedReq.splice(index, 1)
        }
      })
      sender.friends.push(recipientId)
      recipient.friends.push(senderId)
      await sender.save()
      await recipient.save()
    }else{
      throw "One of users not exist"
    }
  }
  static async cancelReq(senderId, recipientId){
    const sender = await user.findOne({id: senderId})
    const recipient = await user.findOne({id: recipientId})
    if(sender && recipient){
      sender.sendedReq.forEach( (req, index) => {
        if(req === recipientId){
          sender.sendedReq.splice(index, 1)
        }
      })
      recipient.gotedReq.forEach( (req, index) => {
        if(req === senderId){
          recipient.gotedReq.splice(index, 1)
        }
      })
      await sender.save()
      await recipient.save()
      
    }else{
      throw "One of users not exist"
    }
  }
  static async deleteFriend(senderId, recipientId){
    const sender = await user.findOne({id: senderId})
    const recipient = await user.findOne({id: recipientId})
    if(sender && recipient){
      sender.friends.forEach( (req, index) => {
        if(req === recipientId){
          sender.friends.splice(index, 1)
        }
      })
      recipient.friends.forEach( (req, index) => {
        if(req === senderId){
          recipient.friends.splice(index, 1)
        }
      })
      await sender.save()
      await recipient.save()
    }else{
      throw "One of users not exist"
    }
  }
  static async addChat(chatId, firstId, secondId){
    const first = await user.findOne({id: firstId})
    const second = await user.findOne({id: secondId})
    const chat = {
      users: [firstId, secondId],
      chatId,
    }
    first.chats.push(chat)
    second.chats.push(chat)
    await first.save()
    await second.save()
    return "succsess"
  }
}

module.exports = User