const HttpError = require("./app/components/HTTPError");
const { User } = require('./app/models');

module.exports = (req, res, next) => {
    const token = req.headers['authorization']
    
    if (token == undefined) {
        throw HttpError(401, 'Token inválido')
    }

    token = token.split(' ');
    jwt.verify(token, secret, (err, data) => {
        if (err) {
            throw HttpError(401, 'Token inválido')
        }

        let user = await User.findOne({ where: { email: data.email } })
        req.user = user
    });

    next();
};