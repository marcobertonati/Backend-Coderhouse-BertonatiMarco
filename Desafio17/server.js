/*Creo servidor */
var express = require("express");
/*Requiero FS*/
var fs = require('fs');
/*Inicializamos express */
var app = express();
/*Le pasamos la constante app que creamos arriba */
var http = require('http').Server(app);
/*Le pasamos la constante http */
var io = require('socket.io')(http);
/*Cargo módulo Handlebars */
var handlebars = require('express-handlebars');
/*Router */
var routerProducts = express.Router();
/*Body Parser */
var bodyParser = require("body-parser");
/*Uso de Middlewares*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
/*Configuración del motor de plantillas */
//Configuración del motor de plantilla 
app.engine('hbs', handlebars({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: "./views/layouts",
    partialsDir: "./views/partials/" // Donde se van a encontrar los partials
}));
// Estableciendo el motor de plantilla que se utiliza
app.set("view engine", "hbs");
// Estableciendo el directorio donde se encuentran los archivos de plantillas
app.set("views", "./views");
app.use('/api', routerProducts);
// app.use(express.static(__dirname + '/public'))
app.use('/static', express.static(__dirname + '/public'));
/*Importo clase de productos*/
var Product = require("./products").Product;
/*Array que contendrá productos*/
var listProducts = [];
var msgChat = [];
/*-----------------------*/
/*Rutas del API*/
routerProducts.get("/productos/listar", function (req, res) {
    if (listProducts.length <= 0) {
        console.log("No se encontraron productos");
        res.send({ error: "No hay productos cargados" });
    }
    else {
        console.log("Se encontraron productos");
        res.send(listProducts);
    }
});
routerProducts.get("/productos/listar/:id", function (req, res) {
    var productCheck = listProducts.some(function (product) { return product.id == req.params.id; });
    if (productCheck) {
        console.log(listProducts[req.params.id - 1]);
        res.send(listProducts[req.params.id - 1]);
    }
    else {
        console.log("Producto no encontrado");
        res.send({ error: "producto no encontrado" });
    }
});
routerProducts.post("/productos/guardar", function (req, res) {
    var newProductBody = req.body;
    if (listProducts.length == 0) {
        var newProduct = new Product(newProductBody.title, newProductBody.price, newProductBody.thumbnail, listProducts.length + 1);
        listProducts.push(newProduct);
        res.redirect('../../productos/agregar');
    }
    else {
        var newProduct = new Product(newProductBody.title, newProductBody.price, newProductBody.thumbnail, listProducts[listProducts.length - 1].id + 1);
        listProducts.push(newProduct);
        res.redirect('../../productos/agregar');
        ;
    }
});
routerProducts.put("/productos/actualizar/:id", function (req, res) {
    var productCheck = listProducts.some(function (product) { return product.id == req.params.id; });
    if (productCheck) {
        listProducts[req.params.id - 1].title = req.body.title;
        listProducts[req.params.id - 1].price = req.body.price;
        listProducts[req.params.id - 1].thumbnail = req.body.thumbnail;
        res.send("Se ha modificado el producto " + listProducts[req.params.id - 1].title);
    }
    else {
        console.log('Producto no encontrado');
        res.send({ error: "No hay producto con el id: " + req.params.id });
    }
    ;
});
routerProducts["delete"]('/productos/borrar/:id', function (req, res) {
    listProducts = listProducts.filter(function (product) { return product.id != req.params.id; });
    res.send("Se borr\u00F3 el producto");
});
/*Rutas vistas */
app.get("/productos/vista", function (req, res) {
    if (listProducts.length <= 0) {
        console.log("No se encontraron productos");
        var noProducts = { state: true, msg: "No hay productos cargados" };
        res.render('./pages/lista', { noProducts: noProducts });
    }
    else {
        console.log("Se encontraron productos");
        res.render('./pages/lista', { listProducts: listProducts });
    }
});
app.get('/productos/agregar', function (req, res) {
    res.render('./pages/agregar');
});
/*-----------------------*/
/*Ejecución de servidor*/
var PORT = 8080;
http.listen(8080, function () { return console.log("Servidor iniciado en puerto " + PORT); });
