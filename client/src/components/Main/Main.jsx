import React from "react"

import {useSelector} from "react-redux"

import "./Main.sass"

export default function Main(){
  const auth = useSelector(state => state.auth)
  return(
    <section className="main">
      <h1>Hello {auth.username}</h1>
      <h2 className="main">This is site where you can text with other people</h2>
    </section>
  )
}