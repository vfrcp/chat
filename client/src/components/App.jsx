import React, { useState, useEffect } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { WebSocketAndAuth } from "../logic/wsAndAuthLogic"

import Header from "./Header/Header"
import Main from "./Main/Main"
import MyChats from "./MyChats/MyChats"
import AllPeople from "./AllPeople/AllPeople"
import MyFriends from "./MyFriends/MyFriends"
import GotedReq from "./GotedReq/GoterdReq"
import Auth from "./Auth/Auth"
import Chat from "./Chat/Chat"
import Modal from "./Modal/Modal"

export default function App(){
  const dispatch = useDispatch()
  const [modalBody, setModalBody] = useState("")
  const socket = useSelector(state => state.webSocket)
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    WebSocketAndAuth.authCheckAndInit(dispatch)
  }, [dispatch])
  useEffect(() => {
    WebSocketAndAuth.connectWs(auth, socket, setModalBody)
    setTimeout(() => {
    }, 2000)
    }, [auth, socket])
  return(
    <div className="app" style={{minHeight: "100vh"}}>
      <BrowserRouter>
        <Header/>
        <Modal modalBody={modalBody} setModalBody={setModalBody} />
        <Switch> 
          <Route exact path="/" component={Main} />
          <Route exact path="/myChats" component={MyChats} />
          <Route exact path="/allPeople" component={AllPeople} />
          <Route exact path="/myFriends" component={MyFriends} />
          <Route exact path="/gotedReq" component={GotedReq} />
          <Route path="/auth/:type" component={Auth} />
          <Route path={"/chat/:id"} component={() => <Chat setModalBody={setModalBody} />} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  )
}