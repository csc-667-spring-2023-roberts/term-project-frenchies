document.getElementById('createRoom').addEventListener('click', function() {
    fetch('http://localhost:8080/room/create', {
        method: 'POST'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Refresh the room list
            loadRooms();
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function loadRooms() {
    fetch('http://localhost:8080/room/list', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(rooms => {
            const roomList = document.getElementById('roomList');
            // Clear existing rooms
            roomList.innerHTML = '';
            rooms.forEach(room => {
                const roomCard = document.createElement('div');
                roomCard.className = 'card';
                roomCard.innerHTML = `
                <div class="room-name">Room Name: ${room.room_id}</div>
                <div class="room-details">Players: ${room.players} / 15</div>
                <div class="room-details">Status: ${room.status}</div>
            `;
                roomCard.addEventListener('click', function() {
                    fetch('http://localhost:8080/room/join', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            roomId: room.room_id
                        })
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('HTTP error ' + response.status);
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log(data);
                            // Redirect to game page
                            window.location.replace(`/game/${room.room_id}`);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                });
                roomList.appendChild(roomCard);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Load the room list when the page loads
window.onload = loadRooms;
