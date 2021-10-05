import React, { useState, useEffect, useRef } from "react"
import { useParams, useHistory } from "react-router-dom"
import {useSelector} from "react-redux"
import { ChatApi } from "../../api/chat"
import { WebSocketAndAuth } from "../../logic/wsAndAuthLogic"

import "./Chat.sass"
import avatar from "../../assets/img/avatar.png"

export default function Chat({setModalBody}){
  const history = useHistory()
  const auth = useSelector(state => state.auth)
  const socket = useSelector(state => state.webSocket)
  if(!auth.hasOwnProperty("id")){
    history.push("/")
  }
  const {id} = useParams()
  const [chat, setChat] = useState({})
  const [input, setInput] = useState("")
  const socketChat = useRef(new WebSocket(`ws://${global.serverLink.split("//")[1]}/ws/chat`)) 
  useEffect(() => {
    const getAll = async () =>{
      const response = await ChatApi.get(id)
      response.users.forEach((user, index) => {
        if(user.id === auth.id){
          response.users.splice(index, 1)
        }
      })
      WebSocketAndAuth.connectWs(auth, socketChat.current, setModalBody)
      setChat(response)
    }
    if(auth.hasOwnProperty("id")){
      getAll()
    }
    return(
      setChat([])
    )
  }, [auth, id, setModalBody])
  const send = () => {
    const message ={
      messageId: Date.now() + Math.random(),
      senderId: auth.id,
      body: input,
      date: Date.now()
    }
    WebSocketAndAuth.sendAction("message", auth.id, chat.users[0].id, socket)
    WebSocketAndAuth.sendAction("sentChatMessage", auth.id, chat.users[0].id, socketChat.current)
    ChatApi.sendMessage(chat.id, message)
    const newChat = {...chat}
    newChat.messages.push(message)
    setChat(newChat)
    setInput("")
  }
  return(
    <section className="chat">
      {
        chat.id ?
        <div className="container d-flex justify-content-center">
          <div className="card mt-5 d-flex flex-column">
              <div className="d-flex flex-row justify-content-between p-3 adiv text-white">
                <span className="pb-3">Chat with {chat.users[0].username}</span> 
              </div>
              <div className="messageArea flex-grow-1 overflow-auto">
              {chat.messages.map((message, index) => {
                const color = (auth.id === message.senderId) ? "green" : "white" 
                const plase = (auth.id === message.senderId) ? "l" : "r" 
                return <div key={message.messageId} className={`d-flex justify-content-${plase === "l" ? "start" : "end"} flex-row p-3 message`}>
                  {plase === "l" && <img src={avatar} alt="" width="60" height="60" />}
                <div className={`chat bg-${color} m${plase}-2 p-3`}>
                  <span className="text">{message.body}</span>
                </div>{plase === "r" && <img src={avatar} alt="" width="60" height="60" />}
                </div>
              })}
              </div>
              <div className="form-group px-3 d-flex align-items-center">
                <textarea value={input} onChange={(event) => setInput(event.target.value)} className="form-control" rows="5" placeholder="Type your message"></textarea>
                <button className="btn" onClick={send}>Send</button>
              </div>
          </div>
        </div>: <div className="main">
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>

      }
    </section>
  )
}