import React, { useEffect, useState, useMemo } from "react"
import { UsersApi } from "../../api/users"
import { useSelector } from "react-redux"

import "./AllPeople.sass"
import avatar from "../../assets/img/avatar.png"
import { WebSocketAndAuth } from "../../logic/wsAndAuthLogic"
import { ChatApi } from "../../api/chat"

export default function AllPeople({history}){
  const auth = useSelector(state => state.auth)
  const socket = useSelector(state => state.webSocket)
  const [page, setPage] = useState(1)
  const [people, setPeople] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [allpage, setAllPage] = useState(1)
  const sortedPeoples = useMemo(() => {
    if(people.length){
      return people.filter(person => person.username.toLowerCase().includes(searchInput.toLowerCase()))
    }
  }, [people, searchInput])
  useEffect(() => {
    const getAll = async () =>{
      setPeople(await UsersApi.getAll())
    }
    getAll()
  }, [])
  useEffect(() => {
    if(sortedPeoples){
      setPage(1)
      setAllPage(Math.ceil(sortedPeoples.length / 10))
    }
  }, [sortedPeoples])
  const action = async (id, type) =>{
    await UsersApi.sendReq(id, type)
    WebSocketAndAuth.sendAction(type, auth.id, id, socket)
    setPeople(await UsersApi.getAll())
  }
  const chatAction = async (id, chat) =>{
    console.log(id, chat)
    if(chat){
      history.push(`/chat/${chat}`)
    }else{
      const response = await ChatApi.create(id)
      history.push(`/chat/${response.id}`)
    }
  }
  return(
    <section className="allPeople">
      <div className="logoAndSearch d-flex justify-content-between mb-5">
        <h1>All people</h1>
        <form className="search d-flex">
            <input className="form-control me-2" value={searchInput} onChange={event => setSearchInput(event.target.value)} type="search" placeholder="Search people" aria-label="Search" />
            <button className="btn btn-outline-light" type="submit">Search</button>
        </form>
        </div>
      {
        people.length ? 
        <div className="row main">
          { sortedPeoples.length ? 
            sortedPeoples.map((person, index) => {
              if(person.username === auth.username){
                return false
              }
              let color 
              let inner
              let type
              let chatStatus = false

                person.friends.forEach((friends) => {
                  if(friends.includes(auth.id)){
                    color = "success"
                    inner = "Delete from friends"
                    type = "deleteFriend"
                  }
                  return null
                })
                person.gotedReq.forEach((req) => {
                  if(req.includes(auth.id)){
                    color = "warning"
                    inner = "Cancel request"
                    type = "cancelReq"
                  }
                  return null
                })
                person.sendedReq.forEach((req) => {
                  if(req.includes(auth.id)){
                    color = "warning"
                    inner = "Accept requset"
                    type = "acceptReq"
                  }
                  return null
                })
                person.chats.forEach(chat => {
                  if(chat.users.includes(auth.id)){
                    chatStatus = chat.id
                  }
                })
                if(!color || !inner){
                  color = "primary"
                  inner = "Add to friends"
                  type = "sendReq"
                }
                  if(page === 1 && index < 10){
                    return  <div className="col-sm-6" key={person.id}>
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title"><img style={{width: "50px"}} src={avatar} alt=""  /> {person.username}</h5>
                          <p className="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio blanditiis debitis, itaque atque excepturi commodi quaera.</p>
                          <button onClick={() => chatAction(person.id, chatStatus)}  className="btn btn-primary">Chat</button>
                          <button onClick={() => action(person.id, type)} className={"btn btn-" + color}>{inner}</button>
                        </div>
                      </div>
                    </div>
                  }if(index >= (page - 1) * 10 && index < page * 10){
                    return  <div className="col-sm-6" key={person.id}>
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title"><img style={{width: "50px"}} src={avatar} alt=""  /> {person.username}</h5>
                          <p className="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio blanditiis debitis, itaque atque excepturi commodi quaera.</p>
                          <button onClick={() => chatAction(person.id, chatStatus)} className="btn btn-primary">Chat</button>
                          <button onClick={() => action(person.id, type)} className={"btn btn-" + color}>{inner}</button>
                        </div>
                      </div>
                    </div>
                  }
                  return null 
                }) :
            <h2 className="main" >such people do not exist</h2>
          }
        </div>: <div className="main">
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
      {
        people &&
        <div className="pages">
        {
          page > 1 && <span className="change" onClick={() => {if(page > 1){setPage(page - 1)}}} >prev/</span>
        }
        <span>{page}</span>
        {
          page < allpage && <span className="change" onClick={() => setPage(page + 1)} >/next</span>
        }
        </div>
      }
    </section>
  )
}