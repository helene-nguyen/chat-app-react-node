//*import modules
import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

//*functions
function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: `${new Date().toLocaleTimeString('fr-Fr')}`,
        date: `${new Date().toLocaleDateString('fr-Fr')}`,
        id: `${new Date().getTime()}`
      };

      await socket.emit('send_message', messageData);
      setMessageList(list => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(
    function() {
      socket.on('receive_message', data => {
        setMessageList(list => [...list, data]);
      });
    },
    [socket]
  );

  //*return component
  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>
          <p>Bienvenue {username}</p>Room {room}
        </h2>
      </div>
      {/* utilisation d'un module npm "react-scroll-to-bottom" pour scroller automatiquement vers le bas*/}
      <ScrollToBottom className="message-container">
        <div className="chat-body">
          {messageList.map(messageContent => {
            // console.log("messageContent: ", messageContent.date);
            return (
              // La condition ternaire permet de switch entre différents css id
              <div className="message" key={messageContent.id}>
                <p className="message-info" id={username === messageContent.author ? 'you-info' : 'other-info'}>
                  {' '}{messageContent.author} {messageContent.time}
                </p>
                <div className="message-content" id={username === messageContent.author ? 'you' : 'other'}>
                  <p>
                    {messageContent.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollToBottom>

      <div className="chat-footer">
        <input
          type="text"
          placeholder="Message..."
          // put a value here to reuse it at the top to clean the input
          value={currentMessage}
          onChange={event => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={event => {
            event.key === 'Enter' && sendMessage();
          }}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

//* export module
export default Chat;
