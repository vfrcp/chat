import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"
import { Link } from "react-router-dom"
import { AuthApi } from "../../api/auth"


export default function Header(){
  const dispatch = useDispatch()
  const location = useLocation().pathname
  let auth = useSelector(state => state)
  if(auth.hasOwnProperty("id")){auth = true}else{auth = false}
  const logout = async () => {
    await AuthApi.logout()
    dispatch({type: "SET_AUTH", payload: {}})
  }
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Chat</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {
                location === "/" ?
                <span style={{cursor: "pointer"}} className="nav-link active" aria-current="page" to="/">Home</span> :
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              }
            </li>
            <li className="nav-item">
              {
                location === "/myChats" ?
                <span style={{cursor: "pointer"}} className="nav-link active" to="/myChats">My Chats</span> :
                <Link className="nav-link" to="/myChats">My Chats</Link>
              }
            </li>
            <li className="nav-item">
              {
                location === "/allPeople" ?
                <span style={{cursor: "pointer"}} className="nav-link active" to="/allPeople">All people</span> :
                <Link className="nav-link" to="/allPeople">All people</Link>
              }
            </li>
            <li className="nav-item">
              {
                location === "/myFriends" ?
                <span style={{cursor: "pointer"}} className="nav-link active" to="/myFriends">My Friends</span> :
                <Link className="nav-link" to="/myFriends">My Friends</Link>
              }
            </li>
            {
              !auth &&
              <li className="nav-item">
                {
                  location === "/auth/login" ?
                  <span style={{cursor: "pointer"}} className="nav-link active" to="/auth/login">Login</span> :
                  <Link className="nav-link" to="/auth/login">Login</Link>
                }
              </li>
            }
            {
              auth ?
              <li className="nav-item">
                <span className="nav-link" onClick={logout}>Logout</span>
              </li> :
              <li className="nav-item">
              {
                location === "/auth/register" ?
                <span style={{cursor: "pointer"}} className="nav-link active" to="/auth/register">Register</span> :
                <Link className="nav-link" to="/auth/register">Register</Link>
              }
            </li>
            }
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search people" aria-label="Search" />
            <button className="btn btn-outline-light" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}

