import {io} from 'socket.io-client';

const url = new URL(window.location.href);
const parts = url.pathname.split('/');
const gameId = parts[parts.length - 1];

const socket = io();

socket.on(`chat-room-${gameId}`, ({ newMessage, senderUsername }) => {
    fetch('http://localhost:8080/users/me', {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .then((userRO) => {
            console.log(userRO);
            console.log(newMessage);

            if (senderUsername !== `Player ${userRO.id}`) {
                const chat = document.getElementById('chat') as HTMLInputElement;

                const messageContainer = document.createElement('div');
                messageContainer.classList.add('message-container');


                const username = document.createElement('p');
                username.classList.add('username');
                username.textContent = senderUsername;
                messageContainer.appendChild(username);

                const messageContent = document.createElement('p');
                messageContent.textContent = newMessage;
                messageContainer.appendChild(messageContent);

                chat.appendChild(messageContainer);
            }
        })
        .catch((err) => {
            console.error(err);
        });
});
