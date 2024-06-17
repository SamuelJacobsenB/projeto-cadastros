const express = require('express');
const app = express();

//---------------------------------

const path = require('path');
app.use(express.static(path.join(__dirname,'public')));

//---------------------------------

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//---------------------------------

const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

app.engine('handlebars', expressHandlebars.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

//---------------------------------

const mongoose = require('mongoose');
mongoose.Promise = global.Promisse;
mongoose.connect('mongodb://localhost/cadastrosgithub').then(()=>{   
    console.log('Conectado com sucesso ao MongoDB');
}).catch(()=>{
    console.log('Erro ao tentar se conectar ao MongoDB');
});

//---------------------------------

const router = require('./routes/routes.js');

//---------------------------------

app.use('/main',router);

//---------------------------------

const PORT = process.env.PORT || 2024;
app.listen(PORT,()=>{console.log('Server rodando...')});