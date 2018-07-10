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
    // After 3 seconds, set `loading` to false in the state.
    setTimeout(() => {
      this.setState({loading: false}); // this triggers a re-render!
    }, 3000)
  }

  render() {
    return (
      //structure of all different components
      //navbar
      <MessageList allMessages={this.state.allMessages}/>
      //footer
    )
  }
}
export default App;
