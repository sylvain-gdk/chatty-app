# Chatty Project

## About the project

A simple full-stack chat application running on WebSockets to allow multiple different user connections.
Each user gets a color assigned. If a user changes his name, the server will notify all other users. It also keeps count of active connections.
The project was build with nodeJS, Express, Websockets, React, Javascript, HTML, CSS, WebPack and Babel.

## Dependencies

- Express
- WebSockets
- React
- ReactDOM

## Getting Started

#### Chatty server
- Install all dependencies in chatty_server folder(using npm install command).
- Run the development web server (using npm start command).

#### Chatty app
- Install all dependencies in chatty-app folder(using npm install command).
- Run the webpack compiler (using npm start command).
- Access the app in a browser at localhost:3000

## Screenshots

#### 3 users connecting
!["starting.png"](https://github.com/sylvain-gdk/chatty-app/blob/master/docs/starting.png)

#### Changing name
!["name-change.png"](https://github.com/sylvain-gdk/chatty-app/blob/master/docs/name-change.png)
