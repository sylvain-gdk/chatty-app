const express = require('express');
const WebSocket = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const socketServer = new WebSocket({ server });



// Broadcasting to all connected clients
socketServer.broadcast = (data, ws) => {
  socketServer.clients.forEach(client => {
    if (client && client.readyState === client.OPEN) {
      client.send(data);
      if(counter >= 3){
        counter = 0;
      }else{
        counter += 1;
      }
    }
  });
};

// For username colors
let counter = 0;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
socketServer.on('connection', (ws) => {
  console.log('Client connected: ', );

  const color = ['blue', 'red', 'green', 'black'];

  ws.on("message", data => {
    const message = JSON.parse(data);
    message.id = uuidv4();
    // Changes the type of messages to incoming
    switch(message.type){
      case 'postMessage':
        message.type = 'incomingMessage';
        break;
      case 'postNotification':
        message.type = 'incomingNotification';
        break;
    }
    socketServer.broadcast(JSON.stringify(message));
  });

  // Username color style
  const style = {
    id: uuidv4(),
    type: 'style',
    style: {
      color: color[counter]
    }
  }
  ws.send(JSON.stringify(style));

  // Welcome message when connecting to server
  const welcomeMessage = {
    id: uuidv4(),
    content: `Welcome to Chatty!`,
    type: 'welcome'
  }
  ws.send(JSON.stringify(welcomeMessage));

  // Counter for the amount of connections
  const message = {
    id: uuidv4(),
    type: 'count-users',
    counter: `${socketServer.clients.size} user(s) online`
  }
  socketServer.broadcast(JSON.stringify(message));


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    message.counter = `${socketServer.clients.size} user(s) online`
    socketServer.broadcast(JSON.stringify(message));
  });
});