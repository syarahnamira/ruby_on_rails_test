import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

const Chatroom = ({ chatroomId, initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetch('/pusher/config')
      .then(response => response.json())
      .then(config => {
        const pusher = new Pusher(config.key, {
          cluster: config.cluster
        });

        const channel = pusher.subscribe(`chatroom_${chatroomId}`);
        channel.bind('message_created', function(data) {
          setMessages(prevMessages => [...prevMessages, data.message]);
        });
      });
  }, [chatroomId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/chatrooms/${chatroomId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: { content: newMessage } })
    });
    setNewMessage('');
  };

  return (
    <div>
      <div id="messages">
        {messages.map((message, index) => (
          <p key={index}>{message.content}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatroom;
