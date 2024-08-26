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
        res.render('login/editUser', {Id_User: req.Id_User, funcao: funcao});
    }

    editarPerfilPost(req, res){
            const funcao = req.query.funcao;
            let newUser = {
                id: cache.get(req.Id_User),
                nome: req.body.nome,
                email: req.body.email,
                password: req.body.senha,
                cpf: req.body.cpf,
                insta: req.body.instagram,
                face: req.body.facebooks,
                funcao: req.body.funcao,
                regiao: req.body.regiao,
                telefone: req.body.telefone
            };
    

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