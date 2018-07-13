// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

ReactDOM.render(<App />, document.getElementById('react-root'));
ReactDOM.render(<NavBar />, document.getElementById('nav'));
