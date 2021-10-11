import React from "react"
import { useSelector } from "react-redux"

import "./Main.sass"

export default function Main(){
  const auth = useSelector(state => state.auth)
  let username = "Guest"
  if(auth){
    username = auth.username
  } 
  return(
    <section className="main">
      <h1>Hello {username}, this is site where you can text with others</h1>
    </section>
  )
}