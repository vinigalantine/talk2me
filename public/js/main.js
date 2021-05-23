const socket = io.connect('/');
const peopleOn = document.getElementById('onPeople');
const sendForm = document.getElementById('formSend');
const messagesBox = document.getElementById('messagesBox');
const msgInput = document.getElementById('messageInput');

socket.on('count', (data) => {
    peopleOn.innerHTML = data.count;
});

socket.on('getMessage', (data) => {
    messagesBox.innerHTML += `<label class="message theirs"><b>${data.user}</b>: ${data.value}</label><br><br>`
});

sendForm.addEventListener('submit', e => {
    e.preventDefault();
    socket.emit('sendMessage', { user: nameUser, value: msgInput.value });
    messagesBox.innerHTML += `<label class="message mine">${msgInput.value}</label><br><br>`
    msgInput.value = "";
})
