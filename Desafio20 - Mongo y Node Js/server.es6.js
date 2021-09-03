/*Creo servidor */
const express = require("express");

/*Inicializamos express */
const app = express();

/*Le pasamos la constante app que creamos arriba */
const http = require("http").Server(app);

/*Le pasamos la constante http */
const io = require("socket.io")(http);

/*Requiero Mongoose para chats */
const messagesChat = require('./src/dao/models/messagesMongoose');

/*Cargo módulo Handlebars */
const handlebars = require("express-handlebars");


/*Router */
const routesProducts = require("./src/routes/routesProducts");
const routerProducts = express.Router();
const routesMessagesChat = require('./src/routes/routesMessagesChat');
const routerMessagesChat = express.Router();
const routesView = require("./src/routes/routesView");
const routerViews = express.Router();

const routesIoChat  = require("./src/routes/routesIOChat");
const routerIoChat = express.Router();


/*Body Parser */
const bodyParser = require("body-parser");
/*Uso de Middlewares*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


/*Configuración del motor de plantilla*/
app.engine(
  "hbs",
  handlebars({
    extname: "hbs", // Extension a utilizar
    defaultLayout: "main.hbs", // El layout que va a cargar en todas las paginas por default
    layoutsDir: `./views/layouts`, // Donde se van a encontrar las layouts
    partialsDir: `./views/partials/`, // Donde se van a encontrar los partials
  })
);
// Estableciendo el motor de plantilla que se utiliza
app.set("view engine", "hbs");
// Estableciendo el directorio donde se encuentran los archivos de plantillas
app.set("views", "./views");


/*Sirve para ofrecer archivos staticos, ej:
http://localhost:8080/static/css/style.css
http://localhost:8080/static/js/index.js
*/
// app.use(express.static(__dirname + '/public'))
app.use("/static", express.static(__dirname + "/public"));


/*Rutas del API: Productos*/
app.use(routesProducts(routerProducts));
/*Rutas del API: Mensaje de chat*/
app.use(routesMessagesChat(routerMessagesChat))
/*Rutas del views productos, agregar y chat*/
app.use(routesView(routerViews));
/*Rutas IO chat*/
app.use(routesIoChat(routerIoChat));

/*Socket.io: Chat */
io.on("connection", async (socket) => {
  console.log(`Usuario conectado ${socket.id}`);

  /*Traigo todos los mensajes */
  try {
    const historyChats = await messagesChat.find();
    socket.emit('list-msg-chat', historyChats);
      } catch (error) {
          console.log(error)
      }

  socket.on('msg-chat', async (data)=> {

    try {
      const dbMsgChat = [{ user: data.user, msg: data.msg, date: data.date}];
      await messagesChat.create(dbMsgChat);
    } catch (error) {
      console.log(error)
    }

    try {
      const historyChats = await messagesChat.find();
      io.emit('list-msg-chat', historyChats); 
    } catch (error) {
      console.log(error)  
    }
    })

  /*Evento desconectar */
  socket.on("disconnect", () => {
    console.log(`El usuario ${socket.id} se desconectó`);
  });
});

module.exports = http;