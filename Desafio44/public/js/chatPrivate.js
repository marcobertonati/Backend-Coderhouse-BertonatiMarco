console.log("ChatPrivate Working!");
const socket = io();

socket.on("list-msg-chat-private", (data) => {
  console.log('Se ejecutó "list-msg-chat-private"');
  console.log(data);

  if (data.length <= 0) {
    console.log("Se ejecutó el if");
    const boardChat = document.getElementById("chat-board");
    boardChat.innerHTML = `<h6> No hay mensajes de chat </h6>`;
  } else {
    console.log(data);
    const boardChat = document.getElementById("chat-board");
    boardChat.innerHTML = ``;
    data.forEach((chat) => {
      boardChat.innerHTML += `<span class="user-chat">${chat.author.id} </span> <span class="date-chat">[${chat.author.date}]:</span> <span class="msg-chat">${chat.text}</span> </br>`;
    });
  }
});

function sendMsgChat() {
    console.log("Entro a funcion send msg");
    let emailUser = document.getElementById("email").value;
  
    if (emailUser === "") {
      alert("¡Ingrese un mail!");
    } else {
      let date = new Date().toLocaleString();
      // let msg = document.getElementById("mensaje-chat").value;
      // let chatMsg = { user: emailUser, msg: msg, date: date };
      let chatMsg = {
        author: {
          id: document.getElementById("email").value,
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          age: document.getElementById("age").value,
          alias: document.getElementById("alias").value,
          avatar: document.getElementById("avatar").value,
          date: date,
        },
        text: document.getElementById("message-chat").value,
      };
  
      socket.emit("msg-chat", chatMsg);
      console.log("Se guardó mensaje en la bas de datos");
      document.getElementById("message-chat").value = "";
    }
  }
  
  const btnSendChat = document
    .getElementById("btn-sendchat")
    .addEventListener("click", sendMsgChat);
  