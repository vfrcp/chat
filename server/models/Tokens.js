const Jwt = require("jsonwebtoken")

class Tokens{
  static create(id, username){
    return {
      tokenA: Jwt.sign({id, username}, process.env.TOKENA, {expiresIn: "1h"}),
      tokenR: Jwt.sign({id, username}, process.env.TOKENR, {expiresIn: "30d"}),
    }
  }
  static verify(tokenR = null, tokenA = null){
    const tokens = {
      tokenR: null,
      tokenA: null,
    }
    if(tokenR){
      try{
        tokens.tokenR = Jwt.verify(tokenR, process.env.TOKENR)
      }catch(err){
        tokens.tokenR = null
      }
    }
    if(tokenA){
      try{
        tokens.tokenA = Jwt.verify(tokenA, process.env.TOKENA)
      }catch(err){
        tokens.tokenA = null
      }
    } 
    return tokens
  }
}

module.exports = Tokens