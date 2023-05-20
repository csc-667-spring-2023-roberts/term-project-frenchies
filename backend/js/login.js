document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get the form data
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Create the JSON data
    const jsonData = {
        username: username,
        password: password,
    };

    // Send the POST request
    fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Redirect to home page
            window.location.replace('/waiting-room');
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
