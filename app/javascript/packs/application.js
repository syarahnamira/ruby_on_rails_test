import React from 'react';
import ReactDOM from 'react-dom';
import Chatroom from '../components/Chatroom';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('chatroom');
  if (node) {
    const chatroomId = node.getAttribute('data-chatroom-id');
    const initialMessages = JSON.parse(node.getAttribute('data-messages'));

    ReactDOM.render(
      <Chatroom chatroomId={chatroomId} initialMessages={initialMessages} />,
      node
    );
  }
});
