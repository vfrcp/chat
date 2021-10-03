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
    console.log(input)
    WebSocketAndAuth.sendAction("sentMessage", auth.id, chat.users[0].id, socket)
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
              <div className="d-flex flex-row p-3 message"> <img src={avatar} alt="" width="60" height="60" />
                  <div className="chat ml-2 p-3">Hello and thankyou for visiting birdlymind. Please click the video above</div>
              </div>
              <div className="d-flex flex-row p-3 message">
                  <div className="bg-white mr-2 p-3">
                    <span className="text-muted">Hello and thankyou for visiting birdlynind.</span>
                  </div><img src={avatar} alt="" width="60" height="60" />
              </div>
              {chat.messages.map((message, index) => {
                return null
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