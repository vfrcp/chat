export class UsersApi{
  static async getAll(){
    let response = await fetch(`${global.serverLink}/users/getAll`)
    return await response.json()
  }
  static async getFriends(){
    const tokens = {}
    tokens.tokenA = localStorage.getItem("token")
    let response = await fetch(`${global.serverLink}/users/getFriends`, {
      method: "POST",
      credentials: "include",
      headers:{
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(tokens)
    })
    response = await response.json()
    console.log(response)
  }
}