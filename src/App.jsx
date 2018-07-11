import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

// Main app component
class App extends Component {
  constructor(){
    super();
    this.state = {
      anonymousCount: 1,
      currentUser: '',
      allMessages:
        {
          messages: []
        }
    };
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/websocket");
    this.socket.addEventListener("open", e => {
      console.log("Connected to websocket server");
    });
    // Updates messages
    this.socket.onmessage = event => {
      const message = JSON.parse(event.data);
      const messages = this.state.allMessages.messages.concat(message)
      this.setState({
        currentUser: message.username,
        allMessages: {messages: messages}
      })
    }
  };

  // Adds a new message to an existing array
  addMessage = (userInput, content) => {
    let currentUser = userInput;
    if((this.state.currentUser === '' && userInput === '') ||
        (this.state.currentUser.slice(0, -1) !=='Anonymous')){
      currentUser = 'Anonymous' + this.state.anonymousCount;
      this.setState({anonymousCount: this.state.anonymousCount += 1});
    }else if(this.state.currentUser !== '' && userInput === ''){
      currentUser = this.state.currentUser;
    }
    if(this.state.currentUser !== currentUser){
      const newNotification = {
        content: `${this.state.currentUser} changed their name to ${currentUser}`,
        type: 'incomingNotification'
      };
      const messages = this.state.allMessages.messages.concat(newNotification);
    }
    const newMessage = {
      username: currentUser,
      content: content,
      type: 'incomingMessage'
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  // Renders a list of messages from an array,
  // sets the currentUser in navbar and
  // adds new messages from navbar input
  render() {
    return (
      <div>
        <MessageList allMessages = {this.state.allMessages}/>
        <ChatBar currentUser = {this.state.currentUser} addMessage = {this.addMessage} />
      </div>
    )
  }
}

export default App;
