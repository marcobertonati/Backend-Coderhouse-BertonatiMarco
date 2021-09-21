/* Rutas de Autenticación, Autorización y Registro */

/* Requiero controladores de ruta */
const { signUp , logIn, logOut} = require('../controller/authController')

module.exports = (router) => {

    router
        .post('/api/signup', signUp)
        .get('/api/login', logIn)
        .post('/api/logout', logOut)
    
    return router

}