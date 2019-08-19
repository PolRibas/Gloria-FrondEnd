import React, { useState,useEffect } from 'react'
import io from 'socket.io-client';
import backEnd from '../services/backEnd'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

export default function Chat(props) {
 
  const [messages, setMessages] = useState([]);
  const [socket] = useState(io(`http://192.168.66.70:4000/`));
  const {id} = socket
    socket.on('create', () => { socket.join(props.match.params.id); })
    

  useEffect(function () {
   let isSubscribed = true
   socket.on('message', message =>{
    if(isSubscribed){
     setMessages([...messages, message])}
   })
   return () => isSubscribed = false
  }, [messages, socket]);
  
  const handleSubmit = (e) =>{
    const body = e.target.value;
    const toDataBase = {body, ID: socket.id}
    if(e.keyCode === 13 && body){
      const message = {
        body,
        from: socket.id,
        room: props.match.params.id
      }
      backEnd.updateOneM(message.from, toDataBase)
        .then(response => {})

      setMessages([...messages, message]);
      socket.emit('message', message);
      e.target.value = ''
    }
  }

  const messagesDestructured = messages.map((message, i) =>{
      if(message.body.room === props.match.params.id || message.from === socket.id){
          return(
            <li key={i}>
            { id === message.from  ? `myself: ${message.body}` : `otherself: ${message.body.body}`}
          </li>
          )
      }else{
        return null;
      }
    
  });
  return (
    <div>
      Chat
      <input 
      type="text" 
      placeholder="Escribe algo"
      onKeyUp={handleSubmit}/>
      <ul>
        {messagesDestructured}
      </ul>
    </div>
  )
}