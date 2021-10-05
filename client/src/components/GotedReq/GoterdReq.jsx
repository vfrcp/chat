import React, { useEffect, useState, useMemo } from "react"
import { UsersApi } from "../../api/users"
import { useSelector } from "react-redux"
import { WebSocketAndAuth } from "../../logic/wsAndAuthLogic"

import "./GotedReq.sass"
import avatar from "../../assets/img/avatar.png"

export default function MyFriends({history}){
  const auth = useSelector(state => state.auth)
  const socket = useSelector(state => state.webSocket)
  if(!auth.hasOwnProperty("id")){
    history.push("/")
  }
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
      setPeople(await UsersApi.get("gotedReq"))
    }
    if(auth.hasOwnProperty("id")){
      getAll()
    }
  }, [auth])
  useEffect(() => {
    if(sortedPeoples){
      setPage(1)
      setAllPage(Math.ceil(sortedPeoples.length / 10))
    }
  }, [sortedPeoples])
  const action = async (id, type) => {
    await UsersApi.sendReq(id, type)
    WebSocketAndAuth.sendAction(type, auth.id, id, socket)
    setPeople(await UsersApi.get("GotedReq"))
  }
  return(
    <section className="gotedReq">
      <div className="logoAndSearch d-flex justify-content-between mb-5">
        <h1>Got Request</h1>
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
              if(page === 1 && index < 10){
                return  <div className="col-sm-6" key={person.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title"><img style={{width: "50px"}} src={avatar} alt=""  /> {person.username}</h5>
                      <p className="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio blanditiis debitis, itaque atque excepturi commodi quaera.</p>
                      <button onClick={() => action(person.id, "acceptReq")} className="btn btn-primary">Accept request</button>
                    </div>
                  </div>
                </div>
              }if(index >= (page - 1) * 10 && index < page * 10){
                return  <div className="col-sm-6" key={person.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title"><img style={{width: "50px"}} src={avatar} alt=""  /> {person.username}</h5>
                      <p className="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio blanditiis debitis, itaque atque excepturi commodi quaera.</p>
                      <button onClick={() => action(person.id, "acceptReq")} className="btn btn-danger">Accept request</button>
                    </div>
                  </div>
                </div>
              }
              return null
            }) :
            <h2>such people do not exist</h2>
          }
        </div>: <div className="main">
          <h2 className="main">You do not have any friends</h2>
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