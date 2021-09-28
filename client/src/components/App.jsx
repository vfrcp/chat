import React, { useEffect } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { AuthApi } from "../api/auth"
import { useSelector, useDispatch } from "react-redux"

import Header from "./Header/Header"
import Main from "./Main/Main"
import MyChats from "./MyChats/MyChats"
import AllPeople from "./AllPeople/AllPeople"
import MyFriends from "./MyFriends/MyFriends"
import GotedReq from "./GotedReq/GoterdReq"
import Auth from "./Auth/Auth"

export default function App(){
  const dispatch = useDispatch()
  const socket = useSelector(state => state.webSocket)
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    const checkAndConect = async () => {
      try{
        const data = await AuthApi.checkToken()
        if(Object.keys(data).length){
          dispatch({type: "SET_AUTH", payload: {id: data.id, username: data.username}})
          dispatch({type: "SET_SOCKET", payload: new WebSocket(`ws://${global.serverLink.split("//")[1]}/ws`)})
          localStorage.setItem("token", data.token)
        }else{throw Error}
      }catch(err){
        console.log(err.message)
        localStorage.removeItem("token")
        dispatch({type: "SET_AUTH", payload: {}})
      }
    }
    checkAndConect()
  }, [dispatch])
  useEffect(() => {
    const socketHendlers = () => {
      if(Object.keys(socket).length){
        socket.onopen = () => {
          socket.send("hell")
        }
        socket.onmessage = (event) => {
          
        }
        socket.send(JSON.stringify({action: "connect", senderId: auth.id, username: auth.username}))
      }
    }
    socketHendlers()
  })
  return(
    <div className="app" style={{minHeight: "100vh"}}>
      <BrowserRouter>
        <Header/>
        <Switch> 
          <Route exact path="/" component={Main} />
          <Route exact path="/myChats" component={MyChats} />
          <Route exact path="/allPeople" component={AllPeople} />
          <Route exact path="/myFriends" component={MyFriends} />
          <Route exact path="/gotedReq" component={GotedReq} />
          <Route path="/auth/:type" component={Auth} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  )
}