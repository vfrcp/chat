const Tokens = require("../models/Tokens")
const User = require("../models/User")

//Проверка токенов с куки и локального хранилища
const authCheck = async (req, res, next) => {
  try{
    const tokens = Tokens.verify(req.cookies.token, req.body.tokenA)
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
        const candidate = await User.getById(id) 
        if (candidate.tokens.includes(tokens.tokenR)){
          const newTokens = Tokens.create(id, username)
          await User.rewriteToken(tokens.tokenR.id, newTokens.tokenR,req.cookies.token)
          res.cookie("token", newTokens.tokenR, {
            maxAge: 1000 * 3600 * 24 * 30,
            httpOnly: true 
          })
          req.auth = {
            id: tokens.tokenA.id,
            username: tokens.tokenA.username,
            status: true,
            changeTokenA: newTokens.tokenA
          }
        }
      }else{
        throw Error
      }
    }
  }catch(err){
    res.clearCookie("token")
    req.auth = {
      status: false,
      changeTokenA: false
    }
  }finally{
    next()
  }
}

module.exports = authCheck