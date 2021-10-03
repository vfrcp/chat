import React, { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { UsersApi } from "../../api/users"

import "./MyChat.sass"
import avatar from "../../assets/img/avatar.png"

export default function MyChats({history}){
  const auth = useSelector(state => state.auth)
  if(!auth.hasOwnProperty("id")){
    history.push("/")
  }
  const [page, setPage] = useState(1)
  const [chats, setChats] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [allpage, setAllPage] = useState(1)
  const sortedchats = useMemo(() => {
    if(chats.length){
      return chats.filter(post => post.users[0].username.toLowerCase().includes(searchInput.toLowerCase()))
    }
  }, [chats, searchInput])
  useEffect(() => {
    const getAll = async () =>{
      const response = await UsersApi.get("chats") 
      response.forEach(chat => {
        chat.users.forEach((user, index) => {
          if(user.id === auth.id){
            chat.users.splice(index, 1)
          }
        })
      })
      setChats(response)
    }
    if(auth.hasOwnProperty("id")){
      getAll()
    }
    return(
      setChats([])
    )
  }, [auth])
  useEffect(() => {
    if(sortedchats){
      setPage(1)
      setAllPage(Math.ceil(sortedchats.length / 10))
    }
  }, [sortedchats])
  return(
    <section className="myChats">
      <div className="logoAndSearch d-flex justify-content-between mb-5">
        <h1>My Chats</h1>
        <form className="search d-flex">
            <input className="form-control me-2" value={searchInput} onChange={event => setSearchInput(event.target.value)} type="search" placeholder="Search people" aria-label="Search" />
            <button className="btn btn-outline-light" type="submit">Search</button>
        </form>
        </div>
      {
        chats.length ? 
        <div className="row main">
          { sortedchats.length ? 
            sortedchats.map((chat, index) => {
              if(page === 1 && index < 10){
                return  <div className="col-sm-6" key={chat.users[0].id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title"><img style={{width: "50px"}} src={avatar} alt=""  /> {chat.users[0].username}</h5>
                      <p className="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio blanditiis debitis, itaque atque excepturi commodi quaera.</p>
                      <Link to={`/chat/${chat.chatId}`} className="btn btn-primary">Chat</Link>
                    </div>
                  </div>
                </div>
              }if(index >= (page - 1) * 10 && index < page * 10){
                return  <div className="col-sm-6" key={chat.users[0].id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title"><img style={{width: "50px"}} src={avatar} alt=""  /> {chat.users[0].username}</h5>
                      <p className="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio blanditiis debitis, itaque atque excepturi commodi quaera.</p>
                      <Link to={`/chat${chat.chatId}`}  className="btn btn-primary">Chat</Link>
                    </div>
                  </div>
                </div>
              }
              return null
            }) :
            <h2>such chats do not exist</h2>
          }
        </div>: <div className="main">
          <h2 className="main">You do not have any chats</h2>
        </div>
      }
      {
        chats &&
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