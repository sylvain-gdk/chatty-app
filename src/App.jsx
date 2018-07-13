import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import NavBar from "./NavBar.jsx";

// Main app component
class App extends Component {
  constructor(){
    super();
    this.state = {
      anonymousCount: 2,
      currentUser: 'Anonymous1',
      style: {},
      messages: []
    };
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/websocket");
    this.socket.onopen = event => {
      console.log("Connected to server");
    };
    // Updates messages from the server
    this.socket.onmessage = event => {
      const message = JSON.parse(event.data);
      switch(message.type){
        case 'incomingMessage':
          this.setState({messages: [...this.state.messages, message]});
          break;
        case 'incomingNotification':
          this.setState({messages: [...this.state.messages, message]});
          break;
        case 'welcome':
          this.setState({
            messages: [...this.state.messages, message]
          });
          break;
        case 'count-users':
          this.setState({
            counter: message.counter
          });
          break;
        case 'style':
          this.setState({
            style: {color: message.style.color}
          });
          break;
      }
    }
  };

  // Sets a message of type notification
  setNotification(oldUser, userInput){
    const message = {
      content: `${oldUser} changed their name to ${userInput}`,
      type: 'postNotification'
    };
    return message;
  }

  // Sets messages of type message
  setMessage(userInput, content){
    const message = {
      username: userInput,
      content: content,
      type: 'postMessage',
      style: {color: this.state.style.color}
    };
    return message;
  }

  // Adds a new message to the messages array
  addMessage = (userInput, content) => {
    const oldUser = this.state.currentUser;
    let newUser = oldUser;
    // Sets currentUser to the new user
    if(userInput !== '' && oldUser !== userInput){
      this.setState({currentUser: userInput});
      this.socket.send(JSON.stringify(this.setNotification(oldUser, userInput)));
      newUser = userInput;
    // Sets Anonymous as new user
    }else if(userInput === '' && this.state.currentUser.slice(0,-1) !== 'Anonymous'){
      newUser = 'Anonymous' + this.state.anonymousCount;
      this.setState({
        anonymousCount: this.state.anonymousCount + 1,
        currentUser: newUser
      });
    // Keeps currentUser
    }else{
      this.setState({currentUser: oldUser});
    }
    const message = this.setMessage(newUser, content);
    this.socket.send(JSON.stringify(message));
  }

  // Renders a list of messages from an array,
  // sets the currentUser in navbar and
  // adds new messages from navbar input
  render() {
    return (
      <div>
        <NavBar counter = {this.state.counter}/>
        <ChatBar addMessage = {this.addMessage} />
        <MessageList messages = {this.state.messages}/>
      </div>
    )
  }
}

export default App;
