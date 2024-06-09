import Pusher from 'pusher-js';

fetch('/pusher/config')
  .then(response => response.json())
  .then(config => {
    const pusher = new Pusher(config.key, {
      cluster: config.cluster
    });

    const channel = pusher.subscribe('chatroom_1');
    channel.bind('message_created', function(data) {
      const messages = document.getElementById('messages');
      messages.innerHTML += `<p>${data.message}</p>`;
    });
  });
