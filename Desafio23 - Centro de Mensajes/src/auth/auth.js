const auth = function (req, res, next) {
    console.log('Ingreso a Auth');

    console.log(req.session.user)

    const user = req.body.user;

    // req.session.user = {userName: user};

    if (!user) throw new Error ('No es posible iniciar sesión')
    if (req.session.user.userName === user) {
        next();
    } else {
        res.json({msg:'Usuario no registrado'})
    }

    // if (req.session.user.user === "marco" ) {
    //     return next()
    // } else {
    //     console.log('Ingreso al else')
    //     return res.json({msg: 'Usuario sin acceso', isRegistered: false
    // })
    // }
    
}
module.exports = { auth }