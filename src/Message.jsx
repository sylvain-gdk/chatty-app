import React from 'react';

// Sends a single message or notification to DOM
const Message = props => {
  if(props.type === 'incomingMessage'){
    return (
      <div className="message">
        <span className="message-username">{props.username}</span>
        <span className="message-content">{props.content}</span>;
      </div>
    )
  }else{
    return (
      <div className="message system">
        {props.content}
      </div>
    )
  }
}

export default Message;
