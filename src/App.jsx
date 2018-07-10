import React, {Component} from 'react';
// import message from "./Message.jsx";

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

const MessageList = props => {
  // Destructuring messages
  const {allMessages} = props;
  const messageList = allMessages.messages.map(item => (
    <Message key={generateRandomId()} content={item.content}
      username={item.username} type={item.type}/>
  ));
  return <div>{messageList}</div>;
}

const ChatBar = props => {
  return (
    <footer className="chatbar">
      <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={props.currentUser}/>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
  )
}

const loading = () => {
  return (
    <div className="message-username">
      Loading...
    </div>
  )
}

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
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!", type: 'incomingMessage'};
      const messages = this.state.allMessages.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({allMessages: {messages: messages}})
    }, 3000)
  }

  render() {
    return (
      <div>
        <MessageList allMessages = {this.state.allMessages}/>
        <ChatBar currentUser = {this.state.currentUser}/>
      </div>
    )
  }
}
export default App;
