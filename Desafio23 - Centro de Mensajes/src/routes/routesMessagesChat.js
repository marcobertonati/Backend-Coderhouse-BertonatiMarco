/*Requiero controladores de messages */
const messagesController = require('../controller/messagesChat');
module.exports = (router) => {
    router
        .get("/api/mensajes/listar", messagesController.getAllMsgChat)
        .post("/api/mensajes/guardar", messagesController.createMsg)
    return router   
}