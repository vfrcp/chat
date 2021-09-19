import React, {useEffect} from "react"
import { BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import { AuthApi } from "../api/auth"
import { useDispatch } from "react-redux"

import Header from "./Header/Header"
import Main from "./Main/Main"
import MyChats from "./MyChats/MyChats"
import AllPeople from "./AllPeople/AllPeople"
import MyFriends from "./MyFriends/MyFriends"
import Auth from "./Auth/Auth"

export default function App(){
  const dispatch = useDispatch()
  useEffect(() => {
    const check = async () => {
      try{
        const data = await AuthApi.checkToken()
        if(Object.keys(data).length){
          dispatch({type: "SET_AUTH", payload: {id: data.id, username: data.username}})
          localStorage.setItem("token", data.token)
        }else{throw Error}
      }catch(err){
        dispatch({type: "SET_AUTH", payload: {}})
      }
    }
    check()
  }, [dispatch])
  return(
    <div className="app">
      <BrowserRouter>
        <Header/>
        <Switch> 
          <Route exact path="/" component={Main} />
          <Route exact path="/myChats" component={MyChats} />
          <Route exact path="/allPeople" component={AllPeople} />
          <Route exact path="/myFriends" component={MyFriends} />
          <Route path="/auth/:type" component={Auth} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  )
}