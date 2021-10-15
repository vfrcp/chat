const Db = require("mongoose")
const {Schema} = require("mongoose")

const Tokens = require("./Tokens")

const userSchema = new Schema({
  id: String, 
  username: String, 
  email: String, 
  password: String,
  friends: Array,
  gotReq: Array,
  sentReq: Array,
  chats: Array,
  tokens: Array,
}, { versionKey: false })

const user = Db.model("User", userSchema)

class User{
  static async getAll(){
    const users = await user.find({})
    const response = users.map(user => {
      const {id, username, friends, gotReq, sentReq, chats} = user
      return {id, username, friends, gotReq, sentReq, chats}
    })
    return response
  }
  static async getById(id, token = false){
    if(typeof id === "object"){
      const response = await user.find({id: {$in: id}})
      const users = []
      for(const user of response){
        const {id, username, friends, gotReq, sentReq, chats} = user
        const res = {id, username, friends, gotReq, sentReq, chats}
        if(token){
          res.tokens = user.tokens
        }
        users.push(res)
      }
      return users
    }else{
      try{
        const response = await user.findOne({id})
        if(response){
          const {id, username, friends, gotReq, sentReq, chats} = response
          const data = [id, username, friends, gotReq, sentReq, chats]
          if(token){
            data.tokens = response.tokens
          }
          return data
        }else{
          throw {message: "User not exist"}
        }
      }catch(err){
        
      }
    }
  }
  // Получить поле пользователя с базы, Если поле chats значит возвращаються имя и id пользователей которые находяться там  
  static async getProperty(id, property){
    const candidate = await user.findOne({id})
    if(candidate){
      const data = candidate[property]
      if(property === "chats"){
        const users = []
        for(const chat of data){
          const usersRaw = await user.find({id: {$in: chat.users}}) 
          for(const user of usersRaw){
            const {id, username, friends, gotReq, sentReq, chats} = user
            users.push({id, username, friends, gotReq, sentReq, chats})
          }
        }
        return users
      }else{
        const response = await user.find({id: {$in: data}})
        const users = []
        response.forEach(user => {
          const {id, username, friends, gotReq, sentReq, chats} = user
          users.push({id, username, friends, gotReq, sentReq, chats})
        })
        return users
      }
    }else{
      throw {message: "User not exist"}
    }
  }

  static async register(id, username, email, password, tokenR){
    const withUsername = await user.findOne({username})
    const withEmail = await user.findOne({email})
    if(withUsername || withEmail){
      throw {message: "User alredy exist"}
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
        throw {message: "Wrong password"}
      }
    }else{
      throw {message: "User not exist"}
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
      throw {message: "User not exist"}
    }
  }
  // Разница между write и rewrite в том что write не ищет старый токен и не удаляет, rewrite нужен во время проверки на валидность авторизации
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
      throw {message: "User not exist"}
    }
  }
  static async sendFriendReq(senderId, recipientId){
    const sender = await user.findOne({id: senderId})
    const recipient = await user.findOne({id: recipientId})
    if(sender && recipient){
      if(sender.sentReq.includes(recipientId) && recipient.gotReq.includes(senderId)){
        throw {message: "Users already have requsts"}
      }
      sender.sentReq.push(recipientId),
      recipient.gotReq.push(senderId)
      await sender.save()
      await recipient.save()
      ("here")
    }else{
      throw {message: "One of users not exist"}
    }
  }
  static async acceptFriendReq(senderId, recipientId){
    const sender = await user.findOne({id: senderId})
    const recipient = await user.findOne({id: recipientId})
    if(sender && recipient){
      if(sender.friends.includes(recipientId) && recipient.friends.includes(senderId)){
        throw {message: "Users already friends"}
      }
      recipient.sentReq.forEach( (req, index) => {
        if(req === senderId){
          recipient.sentReq.splice(index, 1)
        }
      })
      sender.gotReq.forEach( (req, index) => {
        if(req === recipientId){
          sender.gotReq.splice(index, 1)
        }
      })
      sender.friends.push(recipientId)
      recipient.friends.push(senderId)
      await sender.save()
      await recipient.save()
    }else{
      throw {message: "One of users not exist"}
    }
  }
  static async cancelFriendReq(senderId, recipientId){
    const sender = await user.findOne({id: senderId})
    const recipient = await user.findOne({id: recipientId})
    if(sender && recipient){
      sender.sentReq.forEach( (req, index) => {
        if(req === recipientId){
          sender.sentReq.splice(index, 1)
        }
      })
      recipient.gotReq.forEach( (req, index) => {
        if(req === senderId){
          recipient.gotReq.splice(index, 1)
        }
      })
      await sender.save()
      await recipient.save()
      
    }else{
      throw {message: "One of users not exist"}
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
      throw {message: "One of users not exist"}
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
    return {message: "success"}
  }
}

module.exports = User