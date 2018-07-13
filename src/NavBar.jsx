import React from 'react';

// Sends a single message or notification to DOM
const NavBar = props => {
  const {counter} = props;
  return (
    <div className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <div className="navbar-brand navbar-counter">{counter}</div>
    </div>
  )
}

export default NavBar;
