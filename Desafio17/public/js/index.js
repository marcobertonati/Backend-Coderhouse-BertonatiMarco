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



/* ------------------*/

/*Evento que escucha el cliente para construir la tabla de productos */

// socket.on('table products', data => {

//     console.log(data);

//     if(data.length <= 0) {

//         const tBody = document.getElementById('chat-board')
//         tBody.innerHTML = `<h4> No hay productos cargados </h4>`

//     } else {

//         const tBody = document.getElementById('chat-board')
//         tBody.innerHTML = ``
//         data.forEach(data => {
//             tBody.innerHTML += `
//             <tr id="tabla_row">
//             <td>${data.id}</td>
//             <td>${data.title}</td>
//             <td>${data.price}</td>
//             <td><img src="" alt="Imagen" srcset=${data.thumbnail}></td>
//             </tr>`
//         });
//     }
// })

/*Esta función está creada a patir del boton submit del formulario, es por eso que necesitamos prevenir el evento para que el add no vaya por POST sino por socket.emit */

// function addProduct(e) {
//     e.preventDefault();
//     let titleProduct = document.getElementById('title').value;
//     let priceProduct = document.getElementById('price').value;
//     let thumbnailProduct = document.getElementById('thumbnail').value;
//     let productAdded = { 
//         title:  titleProduct,
//         price:  priceProduct,
//         thumbnail: thumbnailProduct,
//     }
//     // console.log(productAdded)
//     socket.emit('add product', productAdded);
//     document.getElementById('title').value = ""
//     document.getElementById('price').value = ""
//     document.getElementById('thumbnail').value = ""
// }
// const btnAddProduct = document.getElementById('btn-addproduct').addEventListener('click', addProduct);