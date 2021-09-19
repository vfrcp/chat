import React from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"

import { AuthApi } from "../../api/auth"

export default function Auth(){
  const type = useParams().type
  const dispatch = useDispatch()
  const submit = async (event) => {
    event.preventDefault()
    let data = new FormData(event.target)
    data = Object.fromEntries(data)
    const link = `${global.serverLink}/auth/${type}`
    let response = await AuthApi.logOrReg(link, data)
    if(Object.keys(data).length){
      dispatch({type: "SET_AUTH", payload: {id: response.id, username: response.username}})
      localStorage.setItem("token", response.token)
    }else{
      alert(response)
    }
    console.log(response)
  }
  return(
    type === "login" ? 
      <section className="auth container py-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
              <form className="card-body p-5 text-center" onSubmit={submit}>
                <h3 className="mb-5">Login</h3>
                <div className="form-outline mb-4">
                  <input name="username" id="typeUsernameX" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="typeEmailX">Username</label>
                </div>
                <div className="form-outline mb-4">
                  <input name="password" id="typePasswordX" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="typePasswordX">Password</label>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <Link to="/"> Reset password </Link>
                  <Link to="/auth/register"> Register </Link>
                </div>
                <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                <hr className="my-4" />
              </form>
            </div>
          </div>
        </div>        
      </section> :
        <section className="auth container py-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
                <form className="card-body p-5 text-center" onSubmit={submit}>
                  <h3 className="mb-5">Register</h3>
                  <div className="form-outline mb-4">
                    <input name="username" id="typeUsernameX" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="typeEmailX">Username</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input name="password" id="typePasswordX" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input name="email" id="typeEmailX" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="typeEmailX">Email</label>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <Link to="/"> Reset password </Link>
                    <Link to="/auth/login"> Login </Link>
                  </div>
                  <button className="btn btn-primary btn-lg btn-block" type="submit">Register</button>
                  <hr className="my-4" />
                </form>
              </div>
            </div>
          </div>
        </section>
  )
}