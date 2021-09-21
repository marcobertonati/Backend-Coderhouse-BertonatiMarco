/*Creo servidor */
const express = require("express");
/*Inicializamos express */
const app = express();
/*Le pasamos la constante app que creamos arriba */
const http = require("http").Server(app);
/*Le pasamos la constante http */
const io = require("socket.io")(http);
/*Cargo módulo Handlebars */
const handlebars = require("express-handlebars");
/*Requiero cors */;
const cors = require('cors')
app.use(cors())



/*Requiero Session*/
const session = require('express-session');
/*Requiero CookieParser */
const cookieParser = require('cookie-parser');

app.use(session({
  secret: "Soy un gran secreto",
  resave: true,
  saveUninitialized: true
}))

app.use(cookieParser());


/*Router */
/*Requerimos las rutas que va a ofrecer nuestra aplicación */
const routesProducts = require("./src/routes/routesProducts");
const routerProducts = express.Router();
const routesCart = require ('./src/routes/routesCart');
const routerCart = express.Router()
const routesMessagesChat = require('./src/routes/routesMessagesChat');
const routerMessagesChat = express.Router();
const routesAuth = require('./src/routes/routesAuth');
const routerAuth = express.Router();

/*Rutas a las view */
const routesView = require("./src/routes/routesView");
const routerViews = express.Router();

/*Rutas a las view via IO */
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

/*Este trabajo funciona con REACTJS: https://github.com/marcobertonati/frontend-react-ecommerceunique/tree/main/src */


/*Rutas del API: Productos*/
app.use(routesProducts(routerProducts));
/*Rutas del API: Cart*/
app.use(routesCart(routerCart));
/*Rutas del API: Mensaje de chat*/
app.use(routesMessagesChat(routerMessagesChat));
/*Rutas del API: Ruta de session*/
app.use(routesAuth(routerAuth));
/*Rutas IO chat*/
app.use(routesIoChat(routerIoChat));
/*Rutas del views productos, agregar y chat*/
app.use(routesView(routerViews));


/*Socket.io: Chat */
/*Requiero la funcion socketIo que lo que contiene adentro es toda la conexión IO. Le paso por parametro el io que es basicamente la que establece la conexión. */
// const socketConnection = require ('./src/services/messagesIOchat');
// socketConnection(io);


/*Exportamos servidor */
module.exports = http;