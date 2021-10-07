import React, { useState } from "react"

import sound from "../../assets/audio/new_message.wav"
import { useDispatch, useSelector } from "react-redux"

import "./Modal.sass"

export default function Modal(){
  const [modalBody, setModalBody] = useState("")
  const stateModalBody = useSelector(state => state.modal)
  const notification = new Audio(sound)
  const dispatch = useDispatch()
  if(!stateModalBody){
    dispatch({type: "SET_MODAL", payload: setModalBody}) 
    // Проверка есть ли в store тело модалки,
    // если есть значит не нужно перезначать(чтобы не не было бесконечного цикла) 
  }
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
            <button onClick={() => setModalBody("")} type="button" className="btn-close"></button>
          </div>
          <div className="modal-body">
            {modalBody}
          </div>
          <div className="modal-footer">
            <button onClick={() => setModalBody("")} type="button" className="btn btn-secondary">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}