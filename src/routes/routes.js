const express = require('express');
const router = express.Router();

//---------------------------------

const mongoose = require('mongoose');
mongoose.Promise = global.Promisse;
mongoose.connect('mongodb://localhost/cadastrosgithub');

//---------------------------------;

require('../models/Cadastros.js');
const UserSchema = mongoose.model('cadastros');

//---------------------------------

router.get('/', (req, res)=>{  
    UserSchema.find().then((cadastros)=>{
        res.render('pages/index',{cadastros: cadastros});
    }).catch((err)=>{
        console.log(err);
    });
});

router.get('/create',(req, res)=>{
    res.render('pages/create');
});

router.get('/search',(req, res)=>{
    UserSchema.find().then((cadastros)=>{
        res.render('pages/search',{cadastros: cadastros});
    }).catch((err)=>{
        console.log(err);
    });
});

router.post('/create/new',(req, res)=>{
    var erros = [];

    if(!req.body.name || req.body.name == null || req.body.name == undefined || req.body.name == ''){
        erros.push({message: 'Nome inválido'});
    };

    if(!req.body.age || req.body.age == null || req.body.age == undefined || req.body.age == ''){
        erros.push({message: 'Idade inválido'});
    };

    if(erros.length > 0){
        res.redirect('/main/create');
    } else {
        const newUser = {
            name: req.body.name,
            age: req.body.age
        };

        new UserSchema(newUser).save()
        .then(()=>{
            res.redirect('/main');
        })
        .catch(()=>{
            res.redirect('/main/create');
        });
    };
});

//---------------------------------

module.exports = router;