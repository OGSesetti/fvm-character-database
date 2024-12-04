document.getElementById('ajaxSubmitButton').addEventListener('click', function(event) {

    event.preventDefault();

    const username = document.getElementById('username').value;
    const country = document.getElementById('country').value;
    const message = document.getElementById('message').value;


    fetch('/ajaxmessage', {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                country: country,
                message: message
            })
        })

        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })

    .then(data => {
        document.getElementById('messageForm').reset(); 
        updateGuestList(data.guests);

    })
    .catch(error => {
    console.error('Error:', error);
    alert("There was an error submitting the message.");
    });
});

function updateGuestList(guests) {
    const guestListContainer = document.getElementById('guestList');
    guestListContainer.innerHTML = '';

    guests.forEach(guest => {
        const guestRow = document.createElement('tr');
        guestRow.innerHTML = `
        <td>${guest.username}</td>
        <td>${guest.country}</td>
        <td>${guest.message}</td>
        <td>${guest.timestamp}</td>
        `;
        guestListContainer.appendChild(guestRow);
    });
}