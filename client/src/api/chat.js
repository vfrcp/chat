export class ChatApi{
  static async get(id){
    const tokens = {}
    tokens.tokenA = localStorage.getItem("token")
    let response = await fetch(`${global.serverLink}/chat/get/${id}`, {
      method: "POST",
      credentials: "include",
      headers:{
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(tokens)
    })
    return await response.json()
  }
  static async create(userId){
    const tokens = {}
    tokens.tokenA = localStorage.getItem("token")
    let response = await fetch(`${global.serverLink}/chat/create`, {
      method: "POST",
      credentials: "include",
      headers:{
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({recipientId: userId, ...tokens})
    })
    return await response.json()
  }
}