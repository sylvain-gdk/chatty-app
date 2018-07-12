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
    // Updates messages from the server
    this.socket.onmessage = event => {
      const message = JSON.parse(event.data);
      if(message.type === 'incomingMessage'){
        this.setState({
          currentUser: this.validateCurrentUser(message.username)
        })
      }
      const messages = this.state.allMessages.messages.concat(message)
      this.setState({
        allMessages: {messages: messages}
      })
    }
  };

  // CurrentUser validation
  validateCurrentUser(userInput){
    let currentUser = userInput;
    if((this.state.currentUser === '' && userInput === '') ||
        (this.state.currentUser.slice(0, -1) !=='Anonymous')){
      currentUser = 'Anonymous' + this.state.anonymousCount;
      this.setState({anonymousCount: this.state.anonymousCount += 1});
    }else if(this.state.currentUser !== '' && userInput === ''){
      currentUser = this.state.currentUser;
    }
    this.setState({currentUser: currentUser})
    console.log('after user validate: ',currentUser)
    return currentUser;
  }

  // Sends a message of type notification
  sendNotification(userInput){
    const message = {
      content: `${this.state.currentUser} changed their name to ${userInput}`,
      type: 'incomingNotification'
    };
    return message;
  }

  // Adds a new message to an existing array
  addMessage = (userInput, content) => {
    const message = {
      username: this.validateCurrentUser(userInput),
      content: content,
      type: 'incomingMessage'
    };
    // If username changed, send notification
    if(this.state.currentUser !== message.username &&
        this.state.currentUser !== ''){
      this.socket.send(JSON.stringify(
        this.sendNotification(userInput)));
    }
    this.socket.send(JSON.stringify(message));
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
