const axios = require('axios')
const cache = require('../configs/cache')

// Base da URL
const urls = "http://localhost:200/users/"

// Variáveis Globais
let usersList = [];

// Controller
class ApiControllerUsuarios{
    addUser( req, res ){
        let id_user = cache.get('id_gerente')
        let newUser = {
            name: req.body.nome,
            email: req.body.email,
            password: req.body.password,
            funcao: req.body.funcao,
            regiao: req.body.regiao,
            cpf: req.body.cpf,
            phone: req.body.phone
        }
        

        if(id_user != null && id_user != ''){
            axios.post(`${urls}newUser`, newUser)
                .then(resp => {
                    axios.post(`${urls}usuarioInfo`, {
                        id: resp.data
                    })
                        .then(resp => {
                            usersList.push(resp.data[0])
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    res.redirect('/admin/usuarios');
                })
                .catch(err => {
                    console.log(err);
                    res.json(false)
                })
        }else{
            console.log('Sem permição para cadastrar usuário')
            res.json(false)
        }
    }

    confirmLogin( req, res ){
        let user = {
            email: req.body.email,
            senha: req.body.senha
        };

        axios.post(`${urls}login`, {
            email: `${user.email}`,
            password: `${user.senha}`
        })
        .then(resp => {
            switch(resp.data.funcao){
                case 'Gerente':
                    cache.set('id_gerente', `${resp.data.id_usuario}`)
                    return res.redirect(307, '/admin/financeiro');
                
                case 'Afiliado':
                    cache.set('id_afiliado', `${resp.data.id_usuario}`);
                    return  console.log("Corno");

                case 'Distribuidor':
                    cache.set('id_distribuidor', `${resp.data.id_usuario}`);
                    return  console.log('OK');

                case 'Vendedor':
                    cache.set('id_vendedor', `${resp.data.id_usuario}`);
                    return  console.log("Outro Corno");

                case 'Representante':
                    cache.set('id_representante', `${resp.data.id_usuario}`);
                    return  console.log("Outro corno 2");

                default:
                    return  console.log("Corno não encontrado");
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    dellUser( req, res ){
        let id_user = cache.get('id_gerente')
        let usuario = req.params.id;


        if(id_user != null && id_user != ''){
            axios.post(`${urls}deleteUser`, {
                id: usuario
            })
                .then(resp => {
                    let id = parseInt(usuario)

                    // Tirando o usuário do array global
                    const arrayModificado = usersList.filter( userFromList =>  userFromList.id_usuario !== id );
                    usersList = arrayModificado                    
                    res.redirect('/admin/usuarios')
                })
                .catch(err => {
                    res.json(false)
                })
        }else{
            console.log('Sem permição para deletar usuário')
            res.json(false)
        }
        
    }

    allUsers( req, res ){
        let id_gerente = cache.get('id_gerente');

        if(usersList.length > 0 ){
            res.json(usersList)
        }else{
            if(id_gerente != null && id_gerente != ''){
                axios.post(`${urls}allUsers`, {
                    id: id_gerente
                })
                    .then(resp => {
                        console.log("Tabela consultada com sucesso!");
                        let data = resp.data;
                        data.forEach( element => {
                            usersList.push(element);
                        });
                        res.json(resp.data)
                    })
                    .catch(err => {
                        console.log(err);
                        res.json(false);
                    })
            }else{
                console.log("Tentativa de consulta indevida");
                res.json(false);
            };
        }
    }
}



module.exports = new ApiControllerUsuarios()