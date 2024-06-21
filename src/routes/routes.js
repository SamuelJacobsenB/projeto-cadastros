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
        req.flash('error_msg','Erro ao listar cadastros');
        res.redirect('/main');
    });
});

router.get('/create',(req, res)=>{
    res.render('pages/create');
});

router.post('/create/new',(req, res)=>{
    var erros = [];

    if(!req.body.name || req.body.name == null || req.body.name == undefined || req.body.name == ''){
        erros.push({message: 'Nome inválido'});
    };

    if(!req.body.age || req.body.age == null || req.body.age == undefined || req.body.age == '' || req.body.age < 1){
        erros.push({message: 'Idade inválido'});
    };

    if(erros.length > 0){
        res.redirect('/main/create',{erros: erros});
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

router.get('/search',(req, res)=>{
    UserSchema.find().then((cadastros)=>{
        res.render('pages/search',{cadastros: cadastros});
    }).catch((err)=>{
        console.log(err);
    });
});

router.get('/edit/:id',(req,res)=>{
    UserSchema.findOne({_id: req.params.id}).then((cadastro)=>{
        res.render('pages/edit',{cadastro: cadastro});
    }).catch((err)=>{
        req.flash('error_msg','Usuário não encontrado');
        res.redirect('/main/search');
    });
});

router.post('/edit',(req,res)=>{
    var erros = [];

    if(!req.body.name || req.body.name == null || req.body.name == undefined || req.body.name == ''){
        erros.push({message: 'Nome inválido'});
    };

    if(!req.body.age || req.body.age == null || req.body.age == undefined || req.body.age == '' || req.body.age < 1){
        erros.push({message: 'Idade inválido'});
    };

    if(erros.length > 0){
        res.redirect('/main/search',{erros: erros});
    } else {
        UserSchema.findOne({_id: req.body.id}).then((cadastro)=>{

            cadastro.name = req.body.name;
            cadastro.age = req.body.age;

            cadastro.save().then(()=>{
                req.flash('success_msg','Cadastro editado com sucesso');
                res.redirect('/main/search');
            }).catch((err)=>{
                req.flash('error_msg','Houve um erro interno ao salvar edição');
                res.redirect('/main/search');
            });

        }).catch((err)=>{
            req.flash('error_msg','Usuário não encontrado');
        });
    };
});

router.post('/delete',(req,res)=>{
    UserSchema.deleteOne({_id: req.body.id}).then(()=>{
        req.flash('success_msg','Cadastro deletado com sucesso');
        res.redirect('/main/search');
    }).catch((err)=>{
        req.flash('error_msg','Houve um erro ao deletar cadastro');
        res.redirect('/main/search');
    });
});

//---------------------------------

module.exports = router;