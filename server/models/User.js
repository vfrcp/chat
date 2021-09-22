const Db = require("mongoose")
const {Schema} = require("mongoose")

const Tokens = require("./Tokens")

const userSchema = new Schema({
  id: String, 
  username: String, 
  email: String, 
  password: String,
  friends: Array,
  friendsReq: Array,
  tokens: Array,
})

const user = Db.model("User", userSchema)

class User{
  static async getAll(){
    const users = await user.find({})
    const response = users.map(user => {
      return {id: user.id, username: user.username, friends: user.friends}
    })
    return response
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
        throw "wrong password"
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
  static async getFriends(id){
    const candidate = await user.findOne({id})
    if(candidate){
      return candidate.friends
    }else{
      throw "User not exist"
    }
  }
}

module.exports = User