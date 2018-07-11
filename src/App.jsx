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
    let user = document.getElementById('user');
    let content = document.getElementById('content');
    if(event.key == 'Enter' && content.value !== ''){
      // if(user.value === ''){
      //   user = 'Anonymous';
      // }
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

// Returns new Anonymous username
const findNextAnonymous = (username, array) => {
  console.log(array)
  for(let user in array){
    if(user.username === username){
      return 'Yeah!!' //user.username + 1;
    }
    else{
      return 'Anonymous'
    }
  }
}

// Main app component
class App extends Component {
  count = 1

  constructor(){
    super();
    this.state = {
      // anonymousCount: count,
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
      const messages = this.state.allMessages.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({allMessages: {messages: messages}})
    }, 3000)
  }

  // Adds a new message to an existing array
  addMessage = (user, content) => {
    let currentUser = user;
      console.log('from input: ', currentUser)
    if(this.state.currentUser === '' && user === ''){
      currentUser = findNextAnonymous('Anonymous', this.state.allMessages.messages);
      console.log('no anonymous yet: ', currentUser)
    }else if(this.state.currentUser !== '' && user === ''){
      currentUser = findNextAnonymous(this.state.currentUser,
                                      this.state.allMessages.messages);
      console.log('anonymous exist: ', currentUser)
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
    console.log('all messages: ', this.state.allMessages)
    console.log('user in state: ', this.state.currentUser)
    return (
      <div>
        <MessageList allMessages = {this.state.allMessages}/>
        <ChatBar currentUser = {this.state.currentUser} addMessage = {this.addMessage} />
      </div>
    )
  }
}

export default App;
