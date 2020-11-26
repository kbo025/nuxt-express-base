require('dotenv/config');
const path = require( 'path' );
const LoginValidator = require(path.resolve('app/validators/LoginValidator'))
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require(path.resolve('app/models'))
const HttpError = require(path.resolve('components/HTTPError'))
const {ValidationError} = require('sequelize');

const SALT_ROUND = 10
const secret = process.env.SECRET_KEY;

const login = async (req, res) => {
  
    try {
        let shema = LoginValidator.validate(req.body, {abortEarly: false})
        if (shema.error != undefined) {
          let errors = shema.error.details.map(e => { return { message: e.message, field: e.context.key, type: e.type } })
          console.log('errors', errors)
          throw new HttpError(400, 'Erros nos datos de entrada', errors)
        }
    
        let {email, password} = req.body
        let user = await User.findOne({ where: { email } })
        if (user === null) {
          throw new HttpError(401, 'Não Autorizado')
        }

        if (!await bcrypt.compare(password, user.password)) {
          throw new HttpError(401, 'Não Autorizado')
        }
    
        let token = jwt.sign(
          {id: user.id, email: user.email},
          secret, 
          { expiresIn: 1440 }
        );
        
        res.status(200).json({ success: true, token, user: {id: user.id, email: user.email, name: user.name }})
    } catch (e) {
        console.error(e)
        if (e instanceof HttpError) {
          res.status(e.code).json({ success: false, message: e.message, data: e.data})
        } else {
          res.status(500).json({ success: false, message: e.message})
        }
    }
}

const register = async (req, res) => {
    try {
        let {name, email, password} = req.body
        const hashedPassword = password ? await bcrypt.hash(password, SALT_ROUND) : null;
        const user = await User.create({name, email, password: hashedPassword})
        user.validate();

        console.log('secret', secret)
        let token = jwt.sign(
            {id: user.id, email: user.email},
            secret,
            { expiresIn : 1440 }
        );
        res.json({user, token});
    } catch (e) {
        if (e instanceof ValidationError) {
            console.log(e.errors)
            let errors = e.errors.map( e => {
                return { field: e.path, message: e.message, type: e.type }
            })
            res.status(400).json({ success: false, message: e.message, data: errors })
        } else if (e instanceof HttpError) {
            res.status(e.code).json({ success: false, message: e.message, data: e.data })
        } else {
            res.status(500).json({ success: false, message: 'Erro Interno!'})
        }
    }
}

module.exports = { login, register }
