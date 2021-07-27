const socket = io();
console.log('hola')



/* agregar el add event prevent default al FORM */

const btnAddProduct = document.getElementById('btn-addproduct').addEventListener('click',)


socket.on('tableproducts', data => {
    console.log(data)
})


// const textSocketId = document.getElementById('socket-id')


// showId();
// async function showId() {

//     const socketId = await socket.on('id socket', socket.id)
//     console.log(socketId)
    
//     // textSocketId.innerHTML = socketId.Socket.id;

// }
