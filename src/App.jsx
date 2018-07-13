import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

// Main app component
class App extends Component {
  constructor(){
    super();
    this.state = {
      anonymousCount: 2,
      currentUser: 'Anonymous1',
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
      }
    }
  };

  // // CurrentUser validation
  // setCurrentUser(userInput){
  //   let username;
  //   if(userInput === this.state.currentUser){
  //     username = this.state.currentUser;
  //   //else if(!userInput && userInput !== this.state.currentUser){
  //   //   username = 'Anonymous' + this.state.anonymousCount;
  //   //   this.setState({anonymousCount: this.state.anonymousCount += 1});
  //   // }else if(userInput === this.state.currentUser){
  //   //   username = this.state.currentUser;
  //   }else{
  //     username = 'oups! problem in lala land.'
  //   }
  //   this.setState({currentUser: username})

  //   return username;
  //   // !userInput && this.state.currentUser.slice(0, -1) !=='Anonymous'
  // }

  // Sends a message of type notification
  setNotification(oldUser){
    const message = {
      content: `${oldUser} changed their name to ${this.state.currentUser}`,
      type: 'postNotification'
    };
    return message;
  }

  setMessage(userInput, content){
    const message = {
      username: userInput,
      content: content,
      type: 'postMessage'
    };
    return message;
  }

  // Adds a new message to an existing array
  addMessage = (userInput, content) => {
    const oldUser = this.state.currentUser;
    if(userInput !== '' && oldUser !== userInput){
      this.setState({currentUser: userInput});
      this.socket.send(JSON.stringify(this.setNotification(oldUser)));
    }else if(userInput === '' && this.state.currentUser.slice(0,-1) !== 'Anonymous'){
      this.setState({
        anonymousCount: this.state.anonymousCount + 1,
        currentUser: 'Anonymous' + this.state.anonymousCount
      });
    }else{
      this.setState({currentUser: oldUser});
    }
    const message = this.setMessage(this.state.currentUser, content);
    this.socket.send(JSON.stringify(message));
  }

  // Renders a list of messages from an array,
  // sets the currentUser in navbar and
  // adds new messages from navbar input
  render() {
    return (
      <div>
        <ChatBar currentUser = {this.state.currentUser} addMessage = {this.addMessage} />
        <MessageList messages = {this.state.messages}/>
      </div>
    )
  }
}

export default App;
