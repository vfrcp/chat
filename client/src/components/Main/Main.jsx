import React from "react"
import { useSelector } from "react-redux"

import "./Main.sass"

export default function Main(){
  const auth = useSelector(state => state)
  console.log(auth)
  return(
    <h1 className="main">This is site where you can text with other people</h1>
  )
}