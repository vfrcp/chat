import React, {useState, useEffect, useMemo} from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

import { UserLogic } from "../../logic/user"
import { ChatLogic } from "../../logic/chat"
import { WebSocketLogic } from "../../logic/webSocket"
import avatar from "../../assets/img/avatar.png"
import "./Userlist.sass"

export default function UsersList({type, label}){
  const history = useHistory()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const socket = useSelector(state => state.webSocket)
  const modal = useSelector(state => state.modal)
  // Обяснения в modal.jsx
  const [render, setRender] = useState(new Date())
  const [page, setPage] = useState(1)
  const [people, setPeople] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [allpage, setAllPage] = useState(1)
  const sortedPeople = useMemo(() => {
    if(people.length){
      return people.filter(person => person.username.toLowerCase().includes(searchInput.toLowerCase()))
    }
  }, [people, searchInput])
  useEffect(() => {
    if(!auth){
      const forbiddenTypesForAnauth = ["chats", "friends", "got"]
      if(forbiddenTypesForAnauth.includes(type)){
        history.push("/")
      }
    }
    dispatch({type: "SET_RENDERLIST", payload: setRender})
    const getAll = async () =>{
      if(type === "all"){
        setPeople(await UserLogic.getAll())
      }else{
        setPeople(await UserLogic.getProperty(type))
      }
    }
    getAll()
    return(
      setPeople([])
    )
  }, [type, auth, history, render, dispatch])
  useEffect(() => {
    if(sortedPeople){
      setPage(1)
      setAllPage(Math.ceil(sortedPeople.length / 10))
    }
    return(
      setAllPage(1)
    )
  }, [sortedPeople])
  const action = async (id, action) =>{
    if(auth){
      await UserLogic.sendAction(id, action)
      WebSocketLogic.sendAction(action, auth.id, id, socket)
      if(type === "all"){
        setPeople(await UserLogic.getAll())
      }else{
        setPeople(await UserLogic.getProperty(type))
      }
    }else{
      modal("You nead Login or Register first")
    }
  }
  const chatAction = async (id, chat) =>{
    if(auth){
      if(chat){
        history.push(`/chat/${chat}`)
      }else{
        const response = await ChatLogic.create(id)
        if(response.message === "success"){
          history.push(`/chat/${response.body.id}`)
        }
    } 
    }else{
      modal("You nead Login or Register first")
    }
  }

  return(
    <section className="list">
      <div className="logoAndSearch d-flex justify-content-between mb-5">
        <h1>{type === "all" ? "All" : "My" } {label}</h1>
        <form className="search d-flex">
            <input className="form-control me-2" value={searchInput} onChange={event => setSearchInput(event.target.value)} type="search" placeholder="Search people" aria-label="Search" />
            <button className="btn btn-outline-light" type="submit">Search</button>
        </form>
        </div>
      {
        people.length ? 
        <div className="row main">
          { sortedPeople.length ? 
            sortedPeople.map((person, index) => { 
              let color = "primary"
              let inner = "Add to friends"
              let typeAction = "modal"
              let chatId = false
              if(auth){
                if(person.username === auth.username){return false}
                color = person.friends.includes(auth.id) ? "danger" :
                  person.gotReq.includes(auth.id) ? "danger" :
                  person.sentReq.includes(auth.id) ? "success": 
                  "primary"

                inner = person.friends.includes(auth.id) ? "Delete from friends" :
                  person.gotReq.includes(auth.id) ? "Cancel request" :
                  person.sentReq.includes(auth.id) ? "Accept request" :
                  "Add to friends"

                typeAction = person.friends.includes(auth.id) ? "deleteFriend" :
                  person.gotReq.includes(auth.id) ? "cancelReq" :
                  person.sentReq.includes(auth.id) ? "acceptReq" :
                  "sendReq"
                person.chats.forEach(chat => {
                  if(chat.users.includes(auth.id)){
                    chatId = chat.chatId
                  }
                })
              }
                if(page === 1 && index < 10){
                  return  <div className="col-sm-6" key={person.id}>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title"><img style={{width: "50px"}} src={avatar} alt=""  /> {person.username}</h5>
                        <p className="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio blanditiis debitis, itaque atque excepturi commodi quaera.</p>
                        <button onClick={() => chatAction(person.id, chatId)}  className="btn btn-primary">Chat</button>
                        <button onClick={() => action(person.id, typeAction)} className={"btn btn-" + color}>{inner}</button>
                      </div>
                    </div>
                  </div>
                }if(index >= (page - 1) * 10 && index < page * 10){
                  return  <div className="col-sm-6" key={person.id}>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title"><img style={{width: "50px"}} src={avatar} alt=""  /> {person.username}</h5>
                        <p className="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio blanditiis debitis, itaque atque excepturi commodi quaera.</p>
                        <button onClick={() => chatAction(person.id, chatId)} className="btn btn-primary">Chat</button>
                        <button onClick={() => action(person.id, typeAction)} className={"btn btn-" + color}>{inner}</button>
                      </div>
                    </div>
                  </div>
                }
                return null 
                }) :
            <h2 className="main" >such people do not exist</h2>
          }
        </div>: <div className="result">
          You dont have any {label}
        </div>
      }
      {
        sortedPeople &&
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