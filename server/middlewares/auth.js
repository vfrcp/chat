const Tokens = require("../models/Tokens")
const User = require("../models/User")

let isWebsocket = false
//Проверка токенов с куки и локального хранилища
const authCheck = async (req, res, next) => {
  try{
    // Не все запросы идут с токеном (websockets) поэтому опускаеться логика чтобы ускорить работу, уменьшить нагрузки и не удалить куки
    isWithToken = true
    if(!req.headers.authorization){
      isWithToken = false
      throw Error
    }
    let tokenA
    try{
      tokenA = req.headers.authorization.split(" ")[1]
    }catch(err){}
    const tokens = Tokens.verify(req.cookies.token, tokenA)
    if(tokens.tokenA && tokens.tokenR && tokens.tokenA.id === tokens.tokenR.id && tokens.tokenA.username === tokens.tokenR.username){
      req.auth = {
        id: tokens.tokenA.id,
        username: tokens.tokenA.username,
        status: true,
        changeTokenA: false 
      }
    }else{
      if(tokens.tokenR){
        const {id, username} = tokens.tokenR
        const candidate = await User.getById(tokens.tokenR.id, true)
        if (candidate.tokens.includes(req.cookies.token)){
          const newTokens = Tokens.create(id, username)
          await User.rewriteToken(tokens.tokenR.id, newTokens.tokenR, req.cookies.token)
          res.cookie("token", newTokens.tokenR, {
            maxAge: 1000 * 3600 * 24 * 30,
            httpOnly: true 
          })
          req.auth = {
            id,
            username,
            status: true,
            changeTokenA: newTokens.tokenA
          }
        }
      }else{
        throw {message: "User don't have this token"}
      }
    }
  }catch(err){
    if(isWithToken){
      res.clearCookie("token")
    }
    req.auth = {
      status: false,
      changeTokenA: false
    }
  }finally{
    next()
  }
}

module.exports = authCheck