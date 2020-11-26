
const express = require('express');
const bodyParser = require('body-parser');
const Auth = require('./app/controllers/AuthController');
const cors = require('cors');
// const RBAC = require('rbac');
// const rbacConf = require('./config/rbac');
// const rbac =  new RBAC(rbacConf);

const port = process.env.PORT || 5000;
const app = express();

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
//await rbac.init();

// Teste api
app.get('/api/mensagem', (req, res) => {
  res.json({ express: 'Hello From Express' });
})

// Auth routes
app.post("/api/auth/login", Auth.login )
app.post("/api/auth/register", Auth.register )

app.listen(port, () => console.log(`Listening on port ${port}`));