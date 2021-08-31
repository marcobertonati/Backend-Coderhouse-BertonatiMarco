'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*Creo servidor */
var express = require("express");

/* Requiero DB y configuración de la misma */
var knex = require('./src/dao/db/connectionKnex');

/*Inicializamos express */
var app = express();

/*Le pasamos la constante app que creamos arriba */
var http = require('http').Server(app);
module.exports = { http: http

  /*Le pasamos la constante http */
};var io = require('socket.io')(http);

/*Cargo módulo Handlebars */
var handlebars = require('express-handlebars');

/*Router */
var routes = require('./src/routes/routes');
var routerProducts = express.Router();
var routesView = require('./src/routes/routesView');
var routerViews = express.Router();

/*Body Parser */
var bodyParser = require("body-parser");

/*Uso de Middlewares*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

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

// app.use(express.static(__dirname + '/public'))
app.use('/static', express.static(__dirname + '/public'));

/*Rutas del API*/
app.use(routes(routerProducts));
/*Rutas del views productos, agregar y chat*/
app.use(routesView(routerViews));

/*Socket.io */
// const { ioEvents } = require('./src/services/chat');
// ioEvents;
io.on('connection', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(socket) {
    var historyChats;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:

            console.log('Usuario conectado ' + socket.id);

            /*Evento envia chat */
            _context2.next = 3;
            return knex.from('history-chat').select('*').then(function (rows) {
              return rows;
            }).catch(function (e) {
              return console.log(e);
            });

          case 3:
            historyChats = _context2.sent;

            // .finally(()=>knex.destroy())
            socket.emit('list-msg-chat', historyChats);

            /*Evento escucha de mensaje */
            socket.on('msg-chat', function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
                var dbMsgChat, historyChats;
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
                        _context.next = 5;
                        return knex.from('history-chat').select('*').then(function (rows) {
                          return rows;
                        }).catch(function (e) {
                          return console.log(e);
                        });

                      case 5:
                        historyChats = _context.sent;

                        // .finally(()=>knex.destroy())
                        io.emit('list-msg-chat', historyChats);

                      case 7:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());

            /*Evento desconectar */
            socket.on('disconnect', function () {
              console.log('El usuario ' + socket.id + ' se desconect\xF3');
            });

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

/*Ejecución de servidor*/
var PORT = 8080;
http.listen(8080, function () {
  return console.log('Servidor iniciado en puerto ' + PORT);
});
