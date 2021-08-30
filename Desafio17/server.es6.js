/*Creo servidor */
const express = require("express");
/*Requiero FS*/
const fs = require('fs');
/* Requiero DB y configuración de la misma */
const { options } = require('./options/mysqlDB');
const knex = require('knex')(options);


/* NOSE COMO HACER PARA QUE CUANDO YA ESTÉ CREADA NO VUELVA A INTENTARLO */

/*Crear tabla historial de chat */
// knex.schema.createTable('history-chat', table => {
//   table.string('user');
//   table.string('msg');
//   table.string('date');
// }).then(() => console.log('Table created')).catch((err)=>console.log(err))
// .finally(()=> knex.destroy());


/*Crear tabla productos */
// knex.schema.createTable('products', (table) => {
//   table.increments('id').primary();;
//   table.string('title');
//   table.integer('price');
//   table.string('thumbnail');
// }).then(() => console.log('Table created')).catch((err)=>console.log(err))
// .finally(()=> knex.destroy());


/*Inicializamos express */
const app = express();

/*Le pasamos la constante app que creamos arriba */
const http = require('http').Server(app);

/*Le pasamos la constante http */
const io = require('socket.io')(http);


/*Cargo módulo Handlebars */
const handlebars = require('express-handlebars');

/*Router */
const routes = require ('./src/routes/routes')
const routerProducts = express.Router();

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


/*-----------------------*/

/*Rutas del API*/
app.use(routes(routerProducts));


/*Rutas vistas para agregar y ver productos */
app.get("/productos/vista", async (req, res) => {

  const products = await knex.from('products').select('*')
    .then((rows) => rows)
    .catch(e=>console.log(e))
    // .finally(()=>knex.destroy())

  if (products.length <= 0) {
    console.log("No se encontraron productos");
    const noProducts = { state: true, msg: "No hay productos cargados"}
    res.render('./pages/lista', {noProducts})
  } else {
    console.log("Se encontraron productos");
    res.render('./pages/lista', {products})
  }
});
app.get('/productos/agregar', (req,res) => {
  res.render('./pages/agregar');
});


/* Ruta de prueba para websocket: CHAT*/
app.get('/websocket', (req,res) => {
  res.render('./websocket')
});

/*Ruta de websocket */
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