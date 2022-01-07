console.log("Checkout Cart Working!");
const socket = io();

function addQuantity(id) {
  let quantity = document.getElementById(id);
  let quantityNumber = Number(quantity.textContent);
  let value = quantityNumber + 1;
  quantity.textContent = value;
  socket.emit("add-quantity", { id: id, quantity: value });
}

function restQuantity(id) {
  let quantity = document.getElementById(id);
  let quantityNumber = Number(quantity.textContent);

  if (quantityNumber == 0) {
    let productToBeRemoved = document.getElementById(`${id}-tr`);
    let parent = document.getElementById("tbody-products-on-cart");
    parent.removeChild(productToBeRemoved);

    // quantity.textContent = 0;
  } else {
    let value = quantityNumber - 1;
    quantity.textContent = value;
    socket.emit("rest-quantity", { id: id, quantity: value });

  }
}

function buyCart() {
  const listOfProducts = [];
  const nodeListOfProducts = document.querySelectorAll(".quantity-product");
  const arrayOfProducts = Array.from(nodeListOfProducts);
  arrayOfProducts.forEach((product) => {
    if (Number(product.textContent) > 0) {
      listOfProducts.push({
        id: product.id,
        quantity: Number(product.textContent),
      });
    }
  });
  if (listOfProducts.length == 0) {
    alert("¡No hay productos en su carrito!");
  } else {
    alert("¡Pedido realizado!");
    fetch("/api/cart/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listOfProducts),
    })
      .then((data) => {
        location.replace("/purchase-completed");
      })
      .catch((e) => console.log(e));
  }
}
