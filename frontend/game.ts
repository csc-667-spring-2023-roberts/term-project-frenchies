import {io} from 'socket.io-client';

const url = new URL(window.location.href);
const parts = url.pathname.split('/');
const gameId = parts[parts.length - 1];

const socket = io();

socket.on(`chat-room-${gameId}-game`, () => {
    // Fetch room information
    fetch('http://localhost:8080/room/' + roomId + '/infos')
        .then(response => response.json())
        .then(data => {
            // Update room name
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.querySelector('h1').textContent = 'Game Room: ' + data.gameInfo.name;

            // Update player info
            const playerInfoDiv = document.querySelector('.player-info') as HTMLInputElement;
            playerInfoDiv.innerHTML = '<h2>Player Info</h2>';

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            data.playerInfos.forEach(player => {
                const p = document.createElement('p');
                p.textContent = 'Player ' + player.userId + ' : Card Count ' + player.cardCount;
                if (player.userId === data.gameInfo.whoisplaying) {
                    p.classList.add('current-player');
                }
                playerInfoDiv.appendChild(p);
            });

            // Update game board
            const gameBoardDiv = document.querySelector('.game-board') as HTMLInputElement;
            gameBoardDiv.innerHTML = '<h2>Game Board</h2>';

            const cardDiv = document.createElement('div');
            cardDiv.id = data.actualCardInfo.card_id;
            cardDiv.classList.add('card');
            cardDiv.classList.add(data.actualCardInfo.color);
            cardDiv.innerHTML = '<p>' + data.actualCardInfo.value + '</p>';
            gameBoardDiv.appendChild(cardDiv);
        })
        .then(() => {
            // Fetch player's cards
            fetch('http://localhost:8080/room/' + roomId + '/cards')
                .then(response => response.json())
                .then(cards => {
                    const cardAreaDiv = document.querySelector('.card-area') as HTMLInputElement;
                    cardAreaDiv.innerHTML = '';

                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    cards.forEach(card => {
                        const cardDiv = document.createElement('div');
                        cardDiv.id = card.card_id;
                        cardDiv.classList.add('card');
                        cardDiv.classList.add(card.color);
                        cardDiv.innerHTML = '<p>' + card.value + '</p>';

                        // Add click event listener
                        cardDiv.addEventListener('click', function() {
                            fetch('http://localhost:8080/room/play', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    roomId: roomId,
                                    cardId: card.card_id
                                })
                            })
                                .then(response => response.json())
                                .then(data => console.log(data))
                                .catch(error => console.error('Error:', error));
                        });

                        cardAreaDiv.appendChild(cardDiv);
                    });
                });
        })
        .catch(error => console.error('Error:', error));
});