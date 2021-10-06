
export class AuthApi{
  static async login(data){
    let response = await fetch(`${global.serverLink}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers:{
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data)
    })
      return await response.json()
  }
  static async register(data){
    let response = await fetch(`${global.serverLink}/auth/register`, {
      method: "POST",
      credentials: "include",
      headers:{
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data)
    })
      return await response.json()
  }
  static async logout(){
    const tokens = {}
    tokens.tokenA = localStorage.getItem("token")
    await fetch(`${global.serverLink}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers:{
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(tokens)
    })
    localStorage.removeItem("token")
  }
  static async get(){
    const tokenA = localStorage.getItem("token")
    let response = await fetch(`${global.serverLink}/auth/getAuth`, {
      method: "POST",
      credentials: "include",
      headers:{
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(tokenA)
    })
    return await response.json()
  }
}
