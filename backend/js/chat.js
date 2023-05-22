const chat = document.getElementById('chat');
const message = document.getElementById('message');
const send = document.getElementById('send');

const url = new URL(window.location.href);
const parts = url.pathname.split('/');
const roomId = parts[parts.length - 1];

(() => {
    fetch(`http://localhost:8080/room/${roomId}/messages`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(messageListRO => {
            const messages = messageListRO.messages;

            messages.forEach((messageData) => {
                let messageContainer = document.createElement('div');
                messageContainer.classList.add('message-container');

                if (messageData.isMe) {
                    messageContainer.classList.add('right');
                }

                let username = document.createElement('p');
                username.classList.add('username');
                username.textContent = messageData.senderUsername;
                messageContainer.appendChild(username);

                let messageContent = document.createElement('p');
                messageContent.textContent = messageData.content;
                messageContainer.appendChild(messageContent);

                chat.appendChild(messageContainer);
            });
        })
        .catch(error => console.error('Error:', error));
})();

send.addEventListener('click', function() {
    if (message.value.trim() !== '') {
        // Update the UI.
        let messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container', 'right');

        let username = document.createElement('p');
        username.classList.add('username');
        username.textContent = 'Me';
        messageContainer.appendChild(username);

        let messageContent = document.createElement('p');
        messageContent.textContent = message.value;
        messageContainer.appendChild(messageContent);

        // Send the new message to the backend to keep a record of it.
        fetch('http://localhost:8080/room/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: message.value,
                roomId: roomId,
            })
        })
            .then(() => {
                // TODO: Maybe do something here? Probably not...
            })
            .catch((err) => {
                console.error(err);
            });

        chat.appendChild(messageContainer);
        chat.scrollTop = chat.scrollHeight;
        message.value = '';
    }
});

