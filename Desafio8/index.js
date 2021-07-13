/*Creo servidor */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

/*Middlewares*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

/*Importo clase de productos*/
const { Product } = require("./products");

/*Array que contendrá productos*/
let listProducts = [];

/*-----------------------*/

/*Rutas*/
app.get("/api/productos/listar", (req, res) => {
  if (listProducts.length <= 0) {
    console.log("No se encontraron productos");
    res.send({ error: "No hay productos cargados" });
  } else {
    console.log("Se encontraron productos");
    res.send(listProducts);
  }
});

app.get("/api/productos/listar/:id", (req, res) => {
  const productCheck = listProducts.some(
    (product) => product.id == req.params.id
  );

  if (productCheck) {
    console.log(listProducts[req.params.id - 1]);
    res.send(listProducts[req.params.id - 1]);
  } else {
    console.log("Producto no encontrado");
    res.send({ error: "producto no encontrado" });
  }
});

app.post("/api/productos/guardar", (req, res) => {
  let newProductBody = req.body;

  if (listProducts.length == 0) {
    let newProduct = new Product(
      newProductBody.title,
      newProductBody.price,
      newProductBody.thumbnail,
      listProducts.length + 1
    );

    listProducts.push(newProduct);
    res.send(newProduct);

  } else {
    let newProduct = new Product(
      newProductBody.title,
      newProductBody.price,
      newProductBody.thumbnail,
      listProducts[listProducts.length-1].id +1
    );

    listProducts.push(newProduct);
    res.send(newProduct);
  }
});

app.delete('/api/productos/borrar/:id', (req, res) => {
    listProducts = listProducts.filter(product => product.id != req.params.id);
    res.send(`Se borró el producto`)
})

/*Ejecución de servidor*/
const PORT = 8080;
app.listen(8080, () => console.log(`Servidor iniciado en puerto ${PORT}`));
