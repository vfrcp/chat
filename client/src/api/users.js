export class UsersApi{
  static async getAll(){
    let response = await fetch(`${global.serverLink}/users/getAll`)
    return await response.json()
  }
  static async get(what){
    const tokens = {}
    tokens.tokenA = localStorage.getItem("token")
    let response = await fetch(`${global.serverLink}/users/get${what}`, {
      method: "POST",
      credentials: "include",
      headers:{
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(tokens)
    })
    return await response.json()
  }
  static async sendReq(recipientId, type){
    const tokens = {}
    tokens.tokenA = localStorage.getItem("token")
    let response = await fetch(`${global.serverLink}/users/${type}`, {
      method: "POST",
      credentials: "include",
      headers:{
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({recipientId, tokenA: tokens.tokenA})
    })
    return await response.json()
  }
}