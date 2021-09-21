const auth = function (req, res, next) {
    console.log('Ingreso a Auth');

    if (!req.session.user) {
        return res.redirect('/login')
    }

    const user = req.session.user.username;

    console.log(`El usuario ${user} ingresó a /welcome`)

    next();



    // if (req.session.user.username === user) {
    //     next();

    // } else {
    //     res.json({msg:'Usuario no registrado'})
    // }

}
module.exports = { auth }