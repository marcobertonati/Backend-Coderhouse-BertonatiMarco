const socket = io();
console.log('Index.js funcionando');

/*Evento que escucha el cliente para construir la tabla de productos */
socket.on('table products', data => {

    console.log(data.length);

    if(data.length <= 0) {

        const tBody = document.getElementById('tabla_body')
        tBody.innerHTML = `<h4> No hay productos cargados </h4>`

    } else {

        const tBody = document.getElementById('tabla_body')
        tBody.innerHTML = ``
        data.forEach(data => {
            tBody.innerHTML += `
            <tr id="tabla_row">
            <td>${data.id}</td>
            <td>${data.title}</td>
            <td>${data.price}</td>
            <td><img src="" alt="Imagen" srcset=${data.thumbnail}></td>
            </tr>`
        });
    }
})


/*Esta función está creada a patir del boton submit del formulario, es por eso que necesitamos prevenir el evento para que el add no vaya por POST sino por socket.emit */
function addProduct(e) {
    e.preventDefault();
    let titleProduct = document.getElementById('title').value;
    let priceProduct = document.getElementById('price').value;
    let thumbnailProduct = document.getElementById('thumbnail').value;

    let productAdded = { 
        title:  titleProduct,
        price:  priceProduct,
        thumbnail: thumbnailProduct,
    }
    // console.log(productAdded)
    socket.emit('add product', productAdded);
    
    document.getElementById('title').value = ""
    document.getElementById('price').value = ""
    document.getElementById('thumbnail').value = ""
}

const btnAddProduct = document.getElementById('btn-addproduct').addEventListener('click', addProduct);