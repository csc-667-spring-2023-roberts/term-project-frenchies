window.addEventListener('DOMContentLoaded', (event) => {
    // Get room id from URL
    let pathArray = window.location.pathname.split('/');
    let roomId = pathArray[pathArray.length - 1];

    // Add event listener to the start game button
    let startGameButton = document.getElementById('startGameButton');
    startGameButton.addEventListener('click', function() {
        fetch('http://localhost:8080/room/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                roomId: roomId
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    });

    // Fetch room information
    fetch('http://localhost:8080/room/' + roomId + '/infos')
        .then(response => response.json())
        .then(data => {
            // Update room name
            document.querySelector('h1').textContent = 'Game Room: ' + data.gameInfo.name;

            // Update player info
            let playerInfoDiv = document.querySelector('.player-info');
            playerInfoDiv.innerHTML = '<h2>Player Info</h2>';

            data.playerInfos.forEach(player => {
                let p = document.createElement('p');
                p.textContent = 'Player ' + player.userId + ' : Card Count ' + player.cardCount;
                if (player.userId === data.gameInfo.whoisplaying) {
                    p.classList.add('current-player');
                }
                playerInfoDiv.appendChild(p);
            });

            // Update game board
            let gameBoardDiv = document.querySelector('.game-board');
            gameBoardDiv.innerHTML = '<h2>Game Board</h2>';

            let cardDiv = document.createElement('div');
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
                    let cardAreaDiv = document.querySelector('.card-area');
                    cardAreaDiv.innerHTML = '';

                    cards.forEach(card => {
                        let cardDiv = document.createElement('div');
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
