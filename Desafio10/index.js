/*Creo servidor */
const express = require("express");
const app = express();

/*Cargo módulo Handlebars */
const handlebars = require('express-handlebars');

/*Router */
const routerProducts = express.Router();

/*Body Parser */
const bodyParser = require("body-parser");

/*Uso de Middlewares*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.engine(
  'hbs',
  handlebars({
    extname: 'hbs', // Extension a utilizar
    defaultLayout: 'main.hbs', // El layout que va a cargar en todas las paginas por default
    layoutsDir: `./views/layouts`, // Donde se van a encontrar las layouts
    partialsDir: `./views/partials/` // Donde se van a encontrar los partials
  })
)

// Estableciendo el motor de plantilla que se utiliza
app.set("view engine", "hbs");
// Estableciendo el directorio donde se encuentran los archivos de plantillas
app.set("views", "./views");


app.use('/api', routerProducts);

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
    res.redirect('../../productos/agregar');

  } else {
    let newProduct = new Product(
      newProductBody.title,
      newProductBody.price,
      newProductBody.thumbnail,
      listProducts[listProducts.length-1].id +1
    );

    listProducts.push(newProduct);
    res.redirect('../../productos/agregar');  }
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
    const noProducts = { state: true, msg: "No hay productos cargados"}
    res.render('productos', {noProducts})
  } else {
    console.log("Se encontraron productos");
    // res.render('main', {title: 'Soy un título'})
    res.render('productos', {listProducts})
  }
});

app.get('/productos/agregar', (req,res) => {
  res.render('agregar-productos');
})


/*Ruta de testing */
// app.get('/prueba', (req,res) => {
//   res.send('Working')
// });


/*Ejecución de servidor*/
const PORT = 8080;
app.listen(8080, () => console.log(`Servidor iniciado en puerto ${PORT}`));