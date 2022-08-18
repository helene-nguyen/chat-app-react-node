//*import modules
import './App.css';
import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';
//*Create connection with server
const socket = io.connect('http://localhost:4110');

//*functions
function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  //*return component
  return (
    <div className="App" >
      {!showChat
        ? <div className="join-chat-container">
            <h2>Join a chat</h2>

            <input
              type="text"
              placeholder="Pseudo"
              onChange={event => {
                setUsername(event.target.value);
              }}
            />

            <input
              type="text"
              placeholder="Room ID..."
              onChange={event => {
                setRoom(event.target.value);
              }}
            />

            <button onClick={joinRoom}>Join a Room</button>
          </div>
        : //* {use component}
          <Chat socket={socket} username={username} room={room} />}
    </div>
  );
}

//* export module
export default App;
