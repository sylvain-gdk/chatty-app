import React  from 'react';
import Message from "./Message.jsx";


// Makes message and notification list
// available for Message component
const MessageList = props => {
  // Destructuring messages
  const {allMessages} = props;
  const messageList = allMessages.messages.map(item => (
    <Message key={item.id} content={item.content}
      username={item.username} type={item.type}/>
  ));
  return <div>{messageList}</div>;
}

export default MessageList;
