const jwt = require('jsonwebtoken');

//====================================
// Verificar token
//====================================

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido',
                }
            });
        };

        req.user = decoded.user;
        next();
    });
};

let verificaAdmin_Role = (req, res, next) => {

    let user = req.user;

    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {

        res.json({
            ok: false,
            err: {
                message: 'El usuario no es adminitrador',
            },
        });
    }
};

module.exports = {
    verificaToken,
    verificaAdmin_Role
};