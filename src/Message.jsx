import React, {Component} from 'react';
// import message from "./MessageList.jsx";


class Message extends Component {
  constructor(){
    super();
    this.state = [
      messages: {
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
      }
    ];
  }
  render() {
    // const message = this.state.messages.map(item => (
    //   <Message key={item.username} content={item.content} />
    // ));
    // return (
    //   (this.state.messages)
    // )
  }
}
export default Message;
