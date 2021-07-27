/*Creo servidor */
const express = require("express");

/*Inicializamos express */
const app = express();

/*Le pasamos la constante app que creamos arriba */
const http = require('http').Server(app);

/*Le pasamos la constante http */
const io = require('socket.io')(http);


// /*Cargo módulo Handlebars */
// const handlebars = require('express-handlebars');

/*Router */
const routerProducts = express.Router();

/*Body Parser */
const bodyParser = require("body-parser");

/*Uso de Middlewares*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

/*Configuración del motor de plantillas */
// Estableciendo el motor de plantilla que se utiliza
app.set("view engine", "ejs");
// Estableciendo el directorio donde se encuentran los archivos de plantillas
app.set("views", "./views");


app.use('/api', routerProducts);

// app.use(express.static(__dirname + '/public'))
app.use('/static',express.static(__dirname + '/public'))


/*Importo clase de productos*/
const { Product } = require("./products");

/*Array que contendrá productos*/
let listProducts = [];

/*-----------------------*/

/*Rutas del API*/
routerProducts.get("/productos/listar", (req, res) => {
  if (listProducts.length <= 0) {
    console.log("No se encontraron productos");
    res.send({ error: "No hay productos cargados" });
  } else {
    console.log("Se encontraron productos");

    res.send(listProducts);
  }
});

routerProducts.get("/productos/listar/:id", (req, res) => {
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

routerProducts.post("/productos/guardar", (req, res) => {
  let newProductBody = req.body;

  if (listProducts.length == 0) {
    let newProduct = new Product(
      newProductBody.title,
      newProductBody.price,
      newProductBody.thumbnail,
      listProducts.length + 1
    );

    listProducts.push(newProduct);
    const listObject = { state: true, list: listProducts}
    res.redirect('./pages/agregar', {listObject});

  } else {
    let newProduct = new Product(
      newProductBody.title,
      newProductBody.price,
      newProductBody.thumbnail,
      listProducts[listProducts.length-1].id +1
    );
    listProducts.push(newProduct);
    const listObject = { state: true, list: listProducts}
    res.redirect('./pages/agregar', {listObject});
    ; 
   }
});

routerProducts.put("/productos/actualizar/:id", (req, res) =>{

  const productCheck = listProducts.some((product) => product.id == req.params.id);

  if (productCheck) {

    listProducts[req.params.id-1].title =req.body.title;
    listProducts[req.params.id-1].price =req.body.price;
    listProducts[req.params.id-1].thumbnail =req.body.thumbnail;

    res.send(`Se ha modificado el producto ${listProducts[req.params.id-1].title}`);

  } else {
    console.log('Producto no encontrado');
    res.send({ error: `No hay producto con el id: ${req.params.id}`});

  };

});

routerProducts.delete('/productos/borrar/:id', (req, res) => {
    listProducts = listProducts.filter(product => product.id != req.params.id);
    res.send(`Se borró el producto`)
})

/*Rutas vistas */
app.get("/productos/vista", (req, res) => {
  if (listProducts.length <= 0) {
    console.log("No se encontraron productos");
    // res.send({ error: "No hay productos cargados" });
    const listObject = { state: false, msg: "No hay productos cargados"}
    res.render('./pages/lista', {listObject})
  } else {
    console.log("Se encontraron productos");
    // res.render('main', {title: 'Soy un título'})
    const listObject = { state: true, list: listProducts}
    // console.log(listObject)
    res.render('./pages/lista', {listObject})
  }
});

app.get('/productos/agregar', (req,res) => {
  res.render('./pages/agregar');
})





/*Ruta de websocket */

app.get('/prueba', (req,res) => {

  if (listProducts.length <= 0) {
    // console.log("No se encontraron productos");
    // res.send({ error: "No hay productos cargados" });
    const listObject = { state: false, msg: "No hay productos cargados"}
    res.render('./pages/prueba', {listObject})
  } else {
    // console.log("Se encontraron productos");
    // res.render('main', {title: 'Soy un título'})
    const listObject = { state: true, list: listProducts}
    // console.log(listObject)
    res.render('./pages/prueba', {listObject})
  }

  io.on('connection', (socket) => {

    console.log(`Usuario conectado ${socket.id}`);

    // if (listProducts.length <= 0) {
    //   console.log("No se encontraron productos");
    //   const listObject = { state: false, msg: "No hay productos cargados"}
    //   socket.emit('tableproducts', {listObject})

    // } else {
    //   console.log("Se encontraron productos");
    //   const listObject = { state: true, list: listProducts}
    //   socket.emit('tableproducts', {listObject})
    // }

    // socket.emit('table products', listProducts);

    socket.emit('table products', listProducts)

    socket.on('add product', (data) => {

      if (listProducts.length == 0) {
        let newProduct = new Product(
          data.title,
          data.price,
          data.thumbnail,
          listProducts.length + 1
        );
    
        listProducts.push(newProduct);

        // console.log(listProducts)

        socket.emit('table products', listProducts);

        // const listObject = { state: true, list: listProducts}
        // res.redirect('./pages/prueba', {listObject});
    
      } else {
        let newProduct = new Product(
          data.title,
          data.price,
          data.thumbnail,
          listProducts[listProducts.length-1].id +1
        );
        listProducts.push(newProduct);

        // console.log(listProducts)

        socket.emit('table products', listProducts);

        // const listObject = { state: true, list: listProducts}
        // res.redirect('./pages/prueba', {listObject});
        ; 
       }


    })

    socket.on('disconnect', () => {
      console.log('El usuariio se desconectó');
    });
   

  })

  
});

/*Ejecución de servidor*/
const PORT = 8080;
http.listen(8080, () => console.log(`Servidor iniciado en puerto ${PORT}`));