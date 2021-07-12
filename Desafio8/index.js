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
    console.log('No se encontraron productos')
    res.send({ error: "No hay productos cargados" });
  } else {
    console.log('Se encontraron productos')
    res.send(listProducts);
  }
});

app.get("/api/productos/listar/:id", (req, res) => {
  const productCheck = listProducts.some(
    (product) => product.id == req.params.id
  );

  if (productCheck) {
    console.log(listProducts[req.params.id]);
    res.send(listProducts[req.params.id]);
  } else {
    console.log("Producto no encontrado");
    res.send({ error: "producto no encontrado" });
  }
});

app.post("/api/productos/guardar", (req, res) => {
  let newProductBody = req.body;
  let newProduct = new Product(
    newProductBody.title,
    newProductBody.price,
    newProductBody.thumbnail
  );
  listProducts.push(newProduct);
  res.send(newProduct);
});

/*Ejecución de servidor*/
const PORT = 8080;
app.listen(8080, () => console.log(`Servidor iniciado en puerto ${PORT}`));