/*Creo servidor */
const express = require("express");

/* Requiero DB y configuración de la misma */
const knex = require('./src/dao/db/connectionKnex')

/*Inicializamos express */
const app = express();

/*Le pasamos la constante app que creamos arriba */
const http = require('http').Server(app);
module.exports = { http }

/*Le pasamos la constante http */
const io = require('socket.io')(http);

/*Cargo módulo Handlebars */
const handlebars = require('express-handlebars');

/*Router */
const routes = require ('./src/routes/routes')
const routerProducts = express.Router();
const routesView = require('./src/routes/routesView')
const routerViews = express.Router();


/*Body Parser */
const bodyParser = require("body-parser");

/*Uso de Middlewares*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//Configuración del motor de plantilla 
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

// app.use(express.static(__dirname + '/public'))
app.use('/static',express.static(__dirname + '/public'))


/*Rutas del API*/
app.use(routes(routerProducts));
/*Rutas del views productos, agregar y chat*/
app.use(routesView(routerViews));

/*Socket.io */
// const { ioEvents } = require('./src/services/chat');
// ioEvents;
io.on('connection', async (socket) => {

  console.log(`Usuario conectado ${socket.id}`);

  /*Evento envia chat */
  const historyChats = await knex.from('history-chat').select('*')
    .then((rows) => rows)
    .catch(e=>console.log(e))
    // .finally(()=>knex.destroy())
  socket.emit('list-msg-chat', historyChats);

  /*Evento escucha de mensaje */
  socket.on('msg-chat', async (data) => {
    /*Si no se agrega async - await duplica los mensajes */

    const dbMsgChat = [ { user: data.user, msg: data.msg, date: data.date}]

    /*Se guarda en la DB */
    await knex('history-chat').insert(dbMsgChat)
      .then(()=> console.log('Chat insertado'))
      .catch((err)=> {
        console.log('Se produjo un error')
        console.log(err)})
      // .finally(()=> knex.destroy());
      /*Con el Finally se corta la conexión knex. Por lo cual una vez que graba en base de datos se corta. Si lo pongo solo se guarda un mensaje y luego aparece un error. */

    const historyChats = await knex.from('history-chat').select('*')
      .then((rows) => rows)
      .catch(e=>console.log(e))
      // .finally(()=>knex.destroy())
    io.emit('list-msg-chat', historyChats);
  })

  /*Evento desconectar */
  socket.on('disconnect', () => {
    console.log(`El usuario ${socket.id} se desconectó`);
  });
})

/*Ejecución de servidor*/
const PORT = 8080;
http.listen(8080, () => console.log(`Servidor iniciado en puerto ${PORT}`));