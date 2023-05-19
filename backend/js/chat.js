const chat = document.getElementById('chat');
const message = document.getElementById('message');
const send = document.getElementById('send');

const fakeData = [
    { username: 'Bob', content: 'Bonjour!', isMe: false },
    { username: 'Me', content: 'Comment ça va?', isMe: true },
    { username: 'Bob', content: 'Je vais bien, merci!', isMe: false },
    { username: 'Me', content: 'Que fais-tu?', isMe: true },
    { username: 'Bob', content: 'Je programme avec JavaScript.', isMe: false },
];

fakeData.forEach(function(messageData) {
    let messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');
    if (messageData.isMe) {
        messageContainer.classList.add('right');
    }

    let username = document.createElement('p');
    username.classList.add('username');
    username.textContent = messageData.username;
    messageContainer.appendChild(username);

    let messageContent = document.createElement('p');
    messageContent.textContent = messageData.content;
    messageContainer.appendChild(messageContent);

    chat.appendChild(messageContainer);
});

send.addEventListener('click', function() {
    if (message.value.trim() !== '') {
        let messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container', 'right');

        let username = document.createElement('p');
        username.classList.add('username');
        username.textContent = 'Me';
        messageContainer.appendChild(username);

        let messageContent = document.createElement('p');
        messageContent.textContent = message.value;
        messageContainer.appendChild(messageContent);

        chat.appendChild(messageContainer);
        chat.scrollTop = chat.scrollHeight;
        message.value = '';
    }
});

