'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*Creo servidor */
var express = require("express");

/*Requiero FS*/
var fs = require('fs');

/* Requiero DB y configuración de la misma */

var _require = require('./options/mysqlDB'),
    options = _require.options;

var knex = require('knex')(options);

/*Crear tabla historial de chat */
knex.schema.createTable('history-chat', function (table) {
  table.string('user');
  table.string('msg');
  table.string('date');
}).then(function () {
  return console.log('Table created');
}).catch(function (err) {
  return console.log(err);
});
// .finally(()=> knex.destroy());

/*Crear tabla productos */
knex.schema.createTable('products', function (table) {
  table.increments('id').primary();;
  table.string('title');
  table.integer('price');
  table.string('thumbnail');
}).then(function () {
  return console.log('Table created');
}).catch(function (err) {
  return console.log(err);
});
// .finally(()=> knex.destroy());


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
  extname: 'hbs', // Extension a utilizar
  defaultLayout: 'main.hbs', // El layout que va a cargar en todas las paginas por default
  layoutsDir: './views/layouts', // Donde se van a encontrar las layouts
  partialsDir: './views/partials/' // Donde se van a encontrar los partials
}));
// Estableciendo el motor de plantilla que se utiliza
app.set("view engine", "hbs");
// Estableciendo el directorio donde se encuentran los archivos de plantillas
app.set("views", "./views");

app.use('/api', routerProducts);

// app.use(express.static(__dirname + '/public'))
app.use('/static', express.static(__dirname + '/public'));

/*Importo clase de productos*/

var _require2 = require("./products"),
    Product = _require2.Product;

/*Array que contendrá productos*/


var listProducts = [];
var msgChat = [];

/*-----------------------*/

/*Rutas del API*/
routerProducts.get("/productos/listar", function (req, res) {
  // if (listProducts.length <= 0) {
  //   console.log("No se encontraron productos");
  //   res.send({ error: "No hay productos cargados" });
  // } else {
  //   console.log("Se encontraron productos");
  //   console.log(listProducts);
  //   res.send(listProducts);
  // }

  /*Consulta a base de datos por productos */
  knex.from('products').select('*').then(function (rows) {
    rows.forEach(function (product) {
      console.log('Producto ' + product.title);
    });
  }).catch(function (e) {
    return console.log(e);
  });
  // .finally(()=>knex.destroy())
  res.send('Productos listados');
});

routerProducts.get("/productos/listar/:id", function (req, res) {

  // const productCheck = listProducts.some(
  //   (product) => product.id == req.params.id
  // );

  // if (productCheck) {
  //   console.log(listProducts[req.params.id - 1]);
  //   res.send(listProducts[req.params.id - 1]);
  // } else {
  //   console.log("Producto no encontrado");
  //   res.send({ error: "producto no encontrado" });
  // }

  /*Consulta a base de datos de producto por id */
  knex.from('products').select('*').where('id', '=', '' + req.params.id).then(function (rows) {

    if (rows.length <= 0) {

      res.send({ msg: 'Producto no encontrado' });
    }

    rows.forEach(function (product) {
      console.log('Producto ' + product.title);
      res.send({ msg: 'Producto encontrado', product: product });
    });
  }).catch(function (e) {
    return console.log(e);
  });
  // .finally(()=>knex.destroy())
});

routerProducts.post("/productos/guardar", function (req, res) {
  var newProductBody = req.body;

  if (listProducts.length == 0) {
    var newProduct = new Product(newProductBody.title, newProductBody.price, newProductBody.thumbnail, listProducts.length + 1);

    var productDB = [{ title: newProductBody.title, price: newProductBody.price, thumbnail: newProductBody.thumbnail }];

    // console.log([newProduct]);
    knex('products').insert(productDB).then(function () {
      return console.log('Producto guardado en la DB');
    }).catch(function (e) {
      return console.log(e);
    });
    // .finally(()=>knex.destroy());

    listProducts.push(newProduct);
    res.redirect('../../productos/agregar');
  } else {
    var _newProduct = new Product(newProductBody.title, newProductBody.price, newProductBody.thumbnail, listProducts[listProducts.length - 1].id + 1);

    var _productDB = [{ title: newProductBody.title, price: newProductBody.price, thumbnail: newProductBody.thumbnail }];

    // console.log([newProduct]);
    knex('products').insert(_productDB).then(function () {
      return console.log('Producto guardado en la DB');
    }).catch(function (e) {
      return console.log(e);
    });
    // .finally(()=>knex.destroy());

    listProducts.push(_newProduct);
    res.redirect('../../productos/agregar');
    ;
  }
});

routerProducts.put("/productos/actualizar/:id", function (req, res) {

  /*Pedido a memoria de servidor */
  // const productCheck = listProducts.some((product) => product.id == req.params.id);

  // if (productCheck) {

  //   listProducts[req.params.id-1].title =req.body.title;
  //   listProducts[req.params.id-1].price =req.body.price;
  //   listProducts[req.params.id-1].thumbnail =req.body.thumbnail;

  //   res.send(`Se ha modificado el producto ${listProducts[req.params.id-1].title}`);

  // } else {
  //   console.log('Producto no encontrado');
  //   res.send({ error: `No hay producto con el id: ${req.params.id}`});

  // };

  /*Perdido a DB */

  knex('products').where('id', '=', '' + req.params.id).update({ title: req.body.title, price: req.body.price, thumbnail: req.body.thumbnail }).then(function () {
    return console.log('Producto actualizado');
  }).catch(function (e) {
    return console.log(e);
  });
  // .finally(()=>knex.destroy())

  res.send('Producto modificado');
});

routerProducts.delete('/productos/borrar/:id', function (req, res) {
  /*Solicitud a memoria de la DB */
  // listProducts = listProducts.filter(product => product.id != req.params.id);
  // res.send(`Se borró el producto`)

  /*Solicitud a la DB */
  knex('products').where('id', '=', '' + req.params.id).del().then(function () {
    console.log('Producto borrado');
    res.send({ msg: 'Se ha borrado un productos' });
  }).catch(function (e) {
    return console.log(e);
  });
  // .finally(()=>knex.destroy());
});

/*Rutas vistas */
app.get("/productos/vista", function (req, res) {
  if (listProducts.length <= 0) {
    console.log("No se encontraron productos");
    var noProducts = { state: true, msg: "No hay productos cargados" };
    res.render('./pages/lista', { noProducts: noProducts });
  } else {
    console.log("Se encontraron productos");
    console.log(listProducts);
    res.render('./pages/lista', { listProducts: listProducts });
  }
});

app.get('/productos/agregar', function (req, res) {
  res.render('./pages/agregar');
});

/* Ruta de prueba para websocket*/
app.get('/websocket', function (req, res) {
  res.render('./websocket');
});

/*Ruta de websocket */
io.on('connection', function (socket) {

  console.log('Usuario conectado ' + socket.id);

  /*Evento que emite al socket para construir la tabla */
  socket.emit('table products', listProducts);

  /*Evento escuchar el servidor para agregar un producto al array */
  socket.on('add product', function (data) {

    if (listProducts.length == 0) {
      var newProduct = new Product(data.title, data.price, data.thumbnail, listProducts.length + 1);
      listProducts.push(newProduct);

      /*Una vez que lo agregar emite a TODOS los socket el nuevo elemento para reconstruir la página a partir de todos */
      io.emit('table products', listProducts);
    } else {
      var _newProduct2 = new Product(data.title, data.price, data.thumbnail, listProducts[listProducts.length - 1].id + 1);
      listProducts.push(_newProduct2);

      /*Una vez que lo agregar emite a TODOS los socket el nuevo elemento para reconstruir la página a partir de todos */
      io.emit('table products', listProducts);
    }
  });

  /*Evento envia chat */
  socket.emit('list-msg-chat', msgChat);

  /*Evento escucha de mensaje */
  socket.on('msg-chat', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
      var dbMsgChat;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              /*Si no se agrega async - await duplica los mensajes */

              dbMsgChat = [{ user: data.user, msg: data.msg, date: data.date }];

              /*Se guarda en la DB */

              _context.next = 3;
              return knex('history-chat').insert(dbMsgChat).then(function () {
                return console.log('Chat insertado');
              }).catch(function (err) {
                console.log('Se produjo un error');
                console.log(err);
              });

            case 3:
              // .finally(()=> knex.destroy());
              /*Con el Finally se corta la conexión knex. Por lo cual una vez que graba en base de datos se corta. Si lo pongo solo se guarda un mensaje y luego aparece un error. */

              /*Se guarda en memoria del servidor */
              msgChat.push(data);

              /*Se guarda en un archivo TXT */
              fs.promises.writeFile('chat-historial.txt', JSON.stringify(msgChat), 'utf-8');

              io.emit('list-msg-chat', msgChat);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  /*Evento desconectar */
  socket.on('disconnect', function () {
    console.log('El usuario ' + socket.id + ' se desconect\xF3');
  });
});

/*Ejecución de servidor*/
var PORT = 8080;
http.listen(8080, function () {
  return console.log('Servidor iniciado en puerto ' + PORT);
});
