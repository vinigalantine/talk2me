const socket = io.connect('/');
const peopleOn = document.getElementById('onPeople');
const sendForm = document.getElementById('formSend');
const messagesBox = document.getElementById('messagesBox');
const msgInput = document.getElementById('messageInput');
const toBeVerb = document.getElementById('toBeVerb');
const endPhrase = document.getElementById('endPhrase');

socket.on('count', (data) => {
    const count = data.count;

    if(count == 1){
        toBeVerb.innerText = 'is';
        endPhrase.innerText = 'person online';
    } else {
        toBeVerb.innerText = 'are';
        endPhrase.innerText = 'people online';
    }

    peopleOn.innerHTML = count;
});

socket.on('getMessage', (data) => {
    messagesBox.innerHTML += `<label class="message theirs"><b>${data.user}</b>: ${data.value}</label><br><br>`;

    scrollToBottom();
});

sendForm.addEventListener('submit', e => {
    e.preventDefault();

    if(msgInput.value.trim() != ""){

        socket.emit('sendMessage', { user: nameUser, value: msgInput.value });
        messagesBox.innerHTML += `<label class="message mine">${msgInput.value}</label><br><br>`;
        msgInput.value = "";
        
        scrollToBottom();
    }
})

function scrollToBottom() {
    messagesBox.scrollTop = messagesBox.scrollHeight;
}