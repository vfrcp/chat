export class AuthApi{
  static async logOrReg(link, data){
    let response = await fetch(link, {
      method: "POST",
      credentials: "include",
      headers:{
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data)
    })
      return await response.json()
  }
  static async checkToken(){
    const tokens = {}
    tokens.tokenA = localStorage.getItem("token")
    let response = await fetch(`${global.serverLink}/auth/check`, {
      method: "POST",
      credentials: "include",
      headers:{
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(tokens)
    })
    response = await response.json()
    if(!response.id){
      response = {}
    }
    return response
  }
}
