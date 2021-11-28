const express = require("express");


/*Router */
/*Requerimos las rutas que va a ofrecer nuestra aplicación */
const routesProducts = require("./routesProducts");
const routerProducts = express.Router();
const routesCart = require("./routesCart");
const routerCart = express.Router();
const routesMessagesChat = require("./routesMessagesChat");
const routerMessagesChat = express.Router();
const routesAuth = require("./routesAuth");
const routerAuth = express.Router();
const routesProcessInfo = require("./routesProcessInfo");
const routerProcessInfo = express.Router();
const routesRandom = require("./routesRandom");
const routerRandom = express.Router();

/*Rutas a las view */
const routesView = require("./routesView");
const routerViews = express.Router();

/*Rutas a las view via IO */
const routesIoChat = require("./routesIOChat");
const routerIoChat = express.Router();

module.exports = routesConfig = () => {
    
routesProducts(routerProducts)
routesCart(routerCart),
routesMessagesChat(routerMessagesChat);
routesAuth(routerAuth);
routesIoChat(routerIoChat);
routesView(routerViews);
routesProcessInfo(routerProcessInfo);
routesRandom(routerRandom);
};
