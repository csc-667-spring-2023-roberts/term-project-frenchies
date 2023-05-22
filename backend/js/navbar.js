document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault();

    fetch('http://localhost:8080/users/logout', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        // Include credentials if necessary (cookies, HTTP basic/digest authentication, etc)
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            // Redirect to home page or show success message here
            window.location.href = '/';
        })
        .catch(error => {
            console.error('Error:', error);
            // Show error message here
        });
});