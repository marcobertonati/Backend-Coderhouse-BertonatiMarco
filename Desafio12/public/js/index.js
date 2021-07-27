const socket = io();
console.log('Index.js funcionando');

socket.on('table products', data => {
    console.log(data)

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

})



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
    socket.emit('add product', productAdded)
    
    document.getElementById('title').value = ""
    document.getElementById('price').value = ""
    document.getElementById('thumbnail').value = ""
}

const btnAddProduct = document.getElementById('btn-addproduct').addEventListener('click', addProduct);