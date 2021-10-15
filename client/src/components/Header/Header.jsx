import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useHistory } from "react-router"
import { Link } from "react-router-dom"
import { AuthApi } from "../../api/auth"


export default function Header(){
  const dispatch = useDispatch()
  const location = useLocation().pathname
  const history = useHistory()
  const auth = useSelector(state => state.auth)
  const logout = async () => {
    await AuthApi.logout()
    dispatch({type: "SET_AUTH", payload: null})
    history.push("/")
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
            {
              auth &&
              <li className="nav-item">
              {
                location === "/mychats" ?
                <span style={{cursor: "pointer"}} className="nav-link active">My Chats</span> :
                <Link className="nav-link" to="/mychats">My Chats</Link>
              }
              </li>
            }
            <li className="nav-item">
              {
                location === "/allpeople" ?
                <span style={{cursor: "pointer"}} className="nav-link active">All people</span> :
                <Link className="nav-link" to="/allpeople">All people</Link>
              }
            </li>
            {
              auth &&
              <li className="nav-item">
              {
                location === "/myfriends" ?
                <span style={{cursor: "pointer"}} className="nav-link active" >My Friends</span> :
                <Link className="nav-link" to="/myfriends">My Friends</Link>
              }
              </li>
            }
            {
              auth &&
              <li className="nav-item">
              {
                location === "/gotreq" ?
                <span style={{cursor: "pointer"}} className="nav-link active" >Got Requests</span> :
                <Link className="nav-link" to="/gotreq">Got Requests</Link>
              }
              </li>
            }
            {
              !auth &&
              <li className="nav-item">
                {
                  location === "/auth/login" ?
                  <span style={{cursor: "pointer"}} className="nav-link active">Login</span> :
                  <Link className="nav-link" to="/auth/login">Login</Link>
                }
              </li>
            }
            {
              auth ?
              <li className="nav-item">
                <span style={{cursor: "pointer"}} className="nav-link" onClick={logout}>Logout</span>
              </li> :
              <li className="nav-item">
              {
                location === "/auth/register" ?
                <span style={{cursor: "pointer"}} className="nav-link active">Register</span> :
                <Link className="nav-link" to="/auth/register">Register</Link>
              }
            </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

