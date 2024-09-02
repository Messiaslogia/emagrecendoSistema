var cache = require('../configs/cache');
const axios = require('axios');

const urlsUser = 'https://apiemagrecendo.com/users/';

class LoginController {

    index(req, res) {
        res.render('login/login');
    }

    login(req, res) {
        res.render('admin/index', {Id_User: req.Id_User});
    }

    logout(req, res){
        cache.del(req.Id_User);
        res.redirect('/');
    }

    editarPerfilIndex(req, res){
        const funcao = req.query.funcao;
        res.render('login/editUser', {Id_User: req.Id_User, idUserHash: cache.get(req.Id_User), funcao: funcao});
    }

    editarPerfilPost(req, res){
            const funcao = req.query.funcao;
            let newUser;
            
            if(req.body.password){
                newUser = {
                    id: cache.get(req.Id_User),
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.password,
                    cpf: req.body.cpf.replace(/[^\d]/g, ''),
                    nascimento: req.body.nascimento.replace(/[^\d]/g, ''),
                    insta: req.body.instagram,
                    face: req.body.facebooks,
                    bairro: req.body.bairro,
                    cep: req.body.cep.replace(/[^\d]/g, ''),
                    endereco: req.body.endereco,
                    numero_endereco: req.body.numerodoendereco,
                    regiao: req.body.regiao,
                    telefone: req.body.telefone.replace(/[^\d]/g, '')
                };
            } else {
                newUser = {
                    id: cache.get(req.Id_User),
                    nome: req.body.nome,
                    email: req.body.email,
                    cpf: req.body.cpf.replace(/[^\d]/g, ''),
                    nascimento: req.body.nascimento.replace(/[^\d]/g, ''),
                    insta: req.body.instagram,
                    bairro: req.body.bairro,
                    endereco: req.body.endereco,
                    cep: req.body.cep.replace(/[^\d]/g, ''),
                    numero_endereco: req.body.numerodoendereco,
                    face: req.body.facebooks,
                    regiao: req.body.regiao,
                    telefone: req.body.telefone.replace(/[^\d]/g, '')
                };
            }

            switch(funcao){
                case 'admin':
                    axios.post(`${urlsUser}editPerfil`, newUser)
                        .then(resp => {
                            res.redirect(`/users?user=${req.Id_User}`)
                        })
                        .catch(err => {
                            console.log(err);
                            res.json(false);
                        })
                    break
                case 'vendedor':    
                    axios.post(`${urlsUser}editPerfil`, newUser)
                        .then(resp => {
                            res.redirect(`/vendedores?user=${req.Id_User}`)
                        })
                        .catch(err => {
                            console.log(err);
                            res.json(false);
                        })
                    break
                case 'distribuidor':    
                    axios.post(`${urlsUser}editPerfil`, newUser)
                        .then(resp => {
                            res.redirect(`/distribuidor?user=${req.Id_User}`)
                        })
                        .catch(err => {
                            console.log(err);
                            res.json(false);
                        })
                    break
            }
            
    }

    distribuidor(req, res) {
        var idDoDistribuidor = cache.get('id_distribuidor')
        res.render('distribuidores/index',{idDoDistribuidor})
    }

    vendedor(req, res) {
        var idDoVendedor = cache.get('id_vendedor')
        res.render('vendedores/index', {idDoVendedor})
    }
}

module.exports = new LoginController()