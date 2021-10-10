import React, { useEffect } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { AuthLogic } from "../logic/auth"
import { WebSocketLogic } from "../logic/webSocket"

import Header from "./Header/Header"
import Main from "./Main/Main"
import UsersList from "./UsersList/UsersList"
import Auth from "./Auth/Auth"
import Chat from "./Chat/Chat"
import Modal from "./Modal/Modal"

export default function App(){
  const dispatch = useDispatch()
  const socket = useSelector(state => state.webSocket)
  const auth = useSelector(state => state.auth)
  const modal = useSelector(state => state.modal)
  useEffect(() => {
    const start = async () => {
      await AuthLogic.set(dispatch)
    }
    if(localStorage.getItem("token")){
      start()
    }
  }, [dispatch])
  useEffect(() => {
    // нужно доделать взаимодействие с модалкой
    if(auth && socket && modal){
      WebSocketLogic.connect(auth, socket, modal)
    }
  }, [auth, socket, modal])
  return(
    <div className="app" style={{minHeight: "100vh"}}>
      <BrowserRouter>
        <Header/>
        <Modal />
        <Switch> 
          <Route exact path="/" component={Main} />
          <Route path="/auth/:type" component={Auth} />
          <Route exact path="/mychats" component={() => <UsersList type="chats" label="Chats" />} />
          <Route exact path="/allpeople" component={() => <UsersList type="all" label="People" />} />
          <Route exact path="/myfriends" component={() => <UsersList type="friends" label="Friends" />} />
          <Route exact path="/gotReq" component={() => <UsersList type="gotReq" label="Got friends request" />} />
          <Route path={"/chat/:id"} component={Chat} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  )
}