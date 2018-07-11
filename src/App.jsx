import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

// Generates a random id
const generateRandomId = (alphabet => {
  const alphabetLength = alphabet.length;
  const randoIter = (key, n) => {
    if (n === 0) {
      return key;
    }
    const randoIndex = Math.floor(Math.random() * alphabetLength);
    const randoLetter = alphabet[randoIndex];
    return randoIter(key + randoLetter, n - 1);
  };
  return () => randoIter("", 10);
})("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

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
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {id: generateRandomId(), username: "Michelle", content: "Hello there!", type: 'incomingMessage'};
      const messages = this.state.allMessages.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({allMessages: {messages: messages}})
    }, 3000)
  }

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
      id: generateRandomId(),
      username: currentUser,
      content: content,
      type: 'incomingMessage'
    };
    const messages = this.state.allMessages.messages.concat(newMessage)
    this.setState({
      currentUser: currentUser,
      allMessages: {messages: messages}
    })
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
