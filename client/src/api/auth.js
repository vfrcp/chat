
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
      response = await response.json()
      return response
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
      response = await response.json()
      return response
  }
  static async logout(){
    const tokenA = localStorage.getItem("token")
    await fetch(`${global.serverLink}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers:{
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({tokenA})
    })
    localStorage.removeItem("token")
  }
  static async get(){
    const tokenA = localStorage.getItem("token")
    let response = await fetch(`${global.serverLink}/auth/get`, {
      method: "POST",
      credentials: "include",
      headers:{
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({tokenA})
    })
    response = await response.json()
    return response
  }
  static async loginOrRegister(data, type){
    let response = await fetch(`${global.serverLink}/auth/${type}`, {
      method: "POST",
      credentials: "include",
      headers:{
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data)
    })
    response = await response.json()    
    return response
  }
}
