const express = require('express');
const WebSocket = require('ws').Server;
const uuidv1 = require('uuid/v1');

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
      counter += 1;
    }
  });
};

let counter = 0;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
socketServer.on('connection', (ws) => {
  console.log('Client connected: ', );

  const color = ['blue', 'red', 'green', 'black'];

  let count = () => {
    if(counter > 4){
      counter = 0;
    }
    return counter;
  }

  ws.on("message", data => {
    const message = JSON.parse(data);
    message.id = uuidv1();
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
    id: uuidv1(),
    type: 'style',
    style: {
      color: color[count()]
    }
  }
  ws.send(JSON.stringify(style));

  // Welcome message when connecting to server
  const welcomeMessage = {
    id: uuidv1(),
    content: `Welcome to Chatty!`,
    type: 'welcome'
  }
  ws.send(JSON.stringify(welcomeMessage));

  // Counter for the amount of connections
  const message = {
    id: uuidv1(),
    type: 'count-users',
    counter: `${socketServer.clients.size} user(s) online`
  }
  socketServer.broadcast(JSON.stringify(message));


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    socketServer.broadcast(JSON.stringify(message));
  });
});