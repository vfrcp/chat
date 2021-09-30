import React from "react"

import sound from "../../assets/audio/new_message.wav"

import "./Modal.sass"

export default function Modal(props){
  const { modalBody, setModalBody } = props
  const notification = new Audio(sound)
  if(modalBody){
    notification.play()
    setTimeout(() => {
      setModalBody("")
    }, 5000)
  }
  return(
    modalBody &&
    <div className="message">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">New message</h5>
            <button onClick={() => setModalBody(false)} type="button" className="btn-close"></button>
          </div>
          <div className="modal-body">
            {modalBody}
          </div>
          <div className="modal-footer">
            <button onClick={() => setModalBody(false)} type="button" className="btn btn-secondary" style={{backgroundColor: "#0d6efd"}} >Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}