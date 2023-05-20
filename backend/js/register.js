document.getElementById('registerForm').addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get the form data
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const passwordConfirmation = document.getElementById('passwordConfirmation').value;

    // Create the JSON data
    const jsonData = {
        username: username,
        password: password,
        passwordConfirmation: passwordConfirmation
    };

    // Send the POST request
    fetch('http://localhost:8080/users/register', {
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
            window.location.replace('/');
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
