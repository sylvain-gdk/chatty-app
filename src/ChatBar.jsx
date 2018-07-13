import React from 'react';

// Returns a new message from input to main app component
const ChatBar = props => {
  const onSubmit = event => {
    // Listens for the Enter key
    let user = document.getElementById('user');
    let content = document.getElementById('content');
    if(event.key == 'Enter' && content.value){
      props.addMessage(user.value, content.value);
      content.value = '';
    }
  };
  return (
    <footer className="chatbar">
      <input id="user" className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={props.currentUser}/>
      <input id="content" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={onSubmit} />
    </footer>
  )
}

export default ChatBar;
