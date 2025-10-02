document.addEventListener('DOMContentLoaded', () => {
    const userContainer = document.getElementById('user-container');
    const reloadButton = document.getElementById('reloadButton');

    const fetchUsers = async () => {
        userContainer.innerHTML = '<p>Loading user data...</p>';
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const users = await response.json();
            displayUsers(users);
        } catch (error) {
            userContainer.innerHTML = `<p>Failed to fetch data. Please check your internet connection and try again.</p>`;
            console.error('Error fetching data:', error);
        }
    };

    const displayUsers = (users) => {
        userContainer.innerHTML = '';
        
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';

            const address = `${user.address.street}, ${user.address.suite}, ${user.address.city}`;

            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Address:</strong> ${address}</p>
            `;
            userContainer.appendChild(userCard);
        });
    };

    reloadButton.addEventListener('click', fetchUsers);
});