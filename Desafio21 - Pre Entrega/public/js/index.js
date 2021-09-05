const socket = io();
console.log('Index.js funcionando');

/*Evento que escucha el cliente para construir el board del chat */
socket.on('list-msg-chat', data => {
    console.log(data);

    console.log('Se ejecutó "list-msg-chat"')

    if(data.length <= 0) {
        console.log('Se ejecutó el if')
        const boardChat = document.getElementById('chat-board');
        boardChat.innerHTML = `<h6> No hay mensajes de chat </h6>`;

    } else {
        console.log(data);
        const boardChat = document.getElementById('chat-board');
        boardChat.innerHTML = ``
        data.forEach(msg => {
            boardChat.innerHTML += `<span class="user-chat">${msg.user} </span> <span class="date-chat">[${msg.date}]:</span> <span class="msg-chat">${msg.msg}</span> </br>`
        });
    }

})


/*Esta función manda el mensaje de chat al servidor */
function sendMsgChat() {
    console.log('Entro a funcion send msg')
    let emailUser = document.getElementById('email-user').value;

    if(emailUser==="") {
        alert('¡Ingrese un mail!')
    } else {

        let date = new Date().toLocaleString();
        let msg = document.getElementById('mensaje-chat').value;
        let chatMsg = { user: emailUser, msg: msg, date: date}
        socket.emit('msg-chat', chatMsg);
        console.log('Se guardó mensaje en la bas de datos');
        document.getElementById('email-user').value = "";
        document.getElementById('mensaje-chat').value = "";

    }


}

const btnSendChat = document.getElementById('btn-sendchat').addEventListener('click', sendMsgChat);
