/*Controladores de rutas AUTH */

exports.signUp = async (req,res,next) => {
    const userName = req.body.username;
    if (!userName) throw new Error ('No es posible registrarse')
    req.session.user = { username: userName};
    res.cookie('isRegistered', `${req.session.user.username}`, {maxAge: 60000});
    res.redirect('/welcome');

}

exports.logIn = async (req,res,next) => {
    const userName = req.body.username;
    if (!userName) throw new Error ('No es posible iniciar sesion')
    if(req.session.user.username == userName) {
      res.json('Te has autenticado con éxito!')
    } else {
      res.json('No te has podido autenticar')
    }
}

exports.logOut = async (req,res,next) => {
    console.log('Ingresó a Logout');
    req.session.destroy();
    res.clearCookie('isRegistered');
    res.redirect('/goodbye');
}