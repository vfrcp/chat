import React, { useEffect } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { AuthLogic } from "../logic/auth"
import { WebSocketLogic } from "../logic/webSocket"

import Header from "./Header/Header"
import Main from "./Main/Main"
// import MyChats from "./MyChats/MyChats"
// import AllPeople from "./AllPeople/AllPeople"
// import MyFriends from "./MyFriends/MyFriends"
// import GotFriendsReq from "./GotReq/GotFriendsReq"
// import Auth from "./Auth/Auth"
// import Chat from "./Chat/Chat"
import Modal from "./Modal/Modal"

export default function App(){
  const dispatch = useDispatch()
  const socket = useSelector(state => state.webSocket)
  const auth = useSelector(state => state.auth)
  // useEffect(() => {
  //   WebSocketLogic.connect(auth, socket) // нужно доделать взаимодействие с модалкой
  // }, [dispatch, socket, auth])
  useEffect(() => {
    const start = async () => {
      await AuthLogic.set(dispatch)
    }
    start()
  }, [dispatch])
  return(
    <div className="app" style={{minHeight: "100vh"}}>
      <BrowserRouter>
        <Header/>
        <Modal />
        <Switch> 
          <Route exact path="/" component={Main} />
          {/* <Route exact path="/mychats" component={MyChats} />
          <Route exact path="/allpeople" component={AllPeople} />
          <Route exact path="/myfriends" component={MyFriends} />
          <Route exact path="/gotfriendsReq" component={GotReq} />
          <Route path="/auth/:type" component={Auth} />
          <Route path={"/chat/:id"} component={Chat} /> */}
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  )
}