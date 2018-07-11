import React, {Component} from 'react';
// import message from "./Message.jsx";

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

// Makes message and notification list
// available for Message component
const MessageList = props => {
  // Destructuring messages
  const {allMessages} = props;
  const messageList = allMessages.messages.map(item => (
    <Message key={generateRandomId()} content={item.content}
      username={item.username} type={item.type}/>
  ));
  return <div>{messageList}</div>;
}

// Returns a new message from input to main app component
const ChatBar = props => {
  const onSubmit = event => {
    // Listens for the Enter key
    if(event.key == 'Enter'){
      let input = document.getElementById('chatbar');
      props.addMessage(input.value);
    }
  };
  return (
    <footer className="chatbar">
      <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={props.currentUser}/>
      <input id="chatbar" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={onSubmit} />
    </footer>
  )
}

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
      loading: true,
      currentUser: 'sylvain',
      allMessages: {
        messages: [
          {
            type: "incomingMessage",
            content: "I won't be impressed with technology until I can download food.",
            username: "Anonymous1"
          },
          {
            type: "incomingNotification",
            content: "Anonymous1 changed their name to nomnom",
          },
          {
            type: "incomingMessage",
            content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
            username: "Anonymous2"
          },
          {
            type: "incomingMessage",
            content: "...",
            username: "nomnom"
          },
          {
            type: "incomingMessage",
            content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
            username: "Anonymous2"
          },
          {
            type: "incomingMessage",
            content: "This isn't funny. You're not funny",
            username: "nomnom"
          },
          {
            type: "incomingNotification",
            content: "Anonymous2 changed their name to NotFunny",
          }
        ]
      }
    };
  }

  componentDidMount() {
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {id: generateRandomId(), username: "Michelle", content: "Hello there!", type: 'incomingMessage'};
      const messages = this.state.allMessages.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({allMessages: {messages: messages}})
    }, 3000)
  }

  // Adds a new message to an existing array
  addMessage = content => {
    const newMessage = {
      id: generateRandomId(),
      username: this.state.currentUser,
      content: content,
      type: 'incomingMessage'
    };
    const messages = this.state.allMessages.messages.concat(newMessage)
    this.setState({allMessages: {messages: messages}})
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
