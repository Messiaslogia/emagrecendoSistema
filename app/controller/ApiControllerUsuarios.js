const axios = require('axios')
const cache = require('../configs/cache');
const { use } = require('../routes');

// Base da URL
const urls = "http://localhost:200/users/"

// Controller
class ApiControllerUsuarios {
    addUser(req, res) {
        let id_user = cache.get('id_gerente')
        let newUser = {
            name: req.body.nome,
            email: req.body.email,
            password: req.body.password,
            funcao: req.body.funcao,
            endereco: req.body.endereco,
            regiao: req.body.regiao,
            cpf: req.body.cpf,
            phone: req.body.phone,
            insta: req.body.instagram,
            face: req.body.facebooks
        }


        if (id_user != null && id_user != '') {
            axios.post(`${urls}newUser`, newUser)
                .then(resp => {
                    axios.post(`${urls}usuarioInfo`, {
                        id: resp.data
                    })
                        .then(resp => {
                            console.log('OK')
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
        } else {
            console.log('Sem permição para cadastrar usuário')
            res.json(false)
        }
    }

    confirmLogin(req, res) {
        let user = {
            email: req.body.email,
            senha: req.body.senha
        };

        axios.post(`${urls}login`, {
            email: `${user.email}`,
            password: `${user.senha}`
        })
            .then(resp => {
                switch (resp.data.funcao) {
                    case 'Gerente':
                        cache.set('id_gerente', `${resp.data.id_usuario}`)
                        return res.redirect(307, '/users');

                    case 'Afiliado':
                        cache.set('id_afiliado', `${resp.data.id_usuario}`);
                        return res.status(404).send("<script>alert('Função não cadastrada para utilização do sistema'); window.history.back();</script>")

                    case 'Distribuidor':
                        cache.set('id_distribuidor', `${resp.data.id_usuario}`);
                        console.log(cache.get('id_distribuidor'))
                        return res.redirect(307, '/distribuidores');

                    case 'Vendedor':
                        cache.set('id_vendedor', `${resp.data.id_usuario}`);
                        return res.redirect(307, '/vendedores');


                    case 'Representante':
                        cache.set('id_representante', `${resp.data.id_usuario}`);
                        return res.status(404).send("<script>alert('Função não cadastrada para utilização do sistema'); window.history.back();</script>")


                    default:
                        return res.status(404).send("<script>alert('Função não encontrado'); window.history.back();</script>")
                }
            })
            .catch(err => {
                if (err.response) {

                    if (err.response.status === 401) {
                        return res.status(401).send('Credenciais Invalidas')
                    } else if (err.response.status === 404) {
                        return res.status(404).send("<script>alert('Usuário não encontrado'); window.history.back();</script>")
                    } else {
                        console.log(res.status(500) + 'Erro interno no servidor')
                        return res.status(500)
                    }
                } else if (err.request) {
                    // A requisição foi feita, mas não houve resposta do servidor
                    console.log(res.status(500) + 'Sem resposta do servidor')
                    return res.status(500).send('Sem resposta do servidor');
                } else {
                    // Ocorreu um erro durante a configuração da requisição
                    console.log(res.status(500) + 'Erro ao enviar requisição')
                    return res.status(500).send('Erro ao enviar requisição');
                }

            })
    }

    dellUser(req, res) {
        let id_user = cache.get('id_gerente')
        let usuario = req.params.id;


        if (id_user != null && id_user != '') {
            axios.post(`${urls}deleteUser`, {
                id: usuario
            })
                .then(resp => {
                    res.redirect('/admin/usuarios')
                })
                .catch(err => {
                    res.json(false)
                })
        } else {
            console.log('Sem permição para deletar usuário')
            res.json(false)
        }

    }

    editIndex(req, res) {
        let id = req.params.id

        res.render('admin/usuarios/editarUsuario', { id })
    }

    editUser(req, res) {
        let id_gerente = cache.get('id_gerente');

        let newUser = {
            id: req.params.id,
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

        if (id_gerente != null && id_gerente != '') {
            axios.post(`${urls}editUser`, newUser)
                .then(resp => {
                    console.log('truco')
                    res.redirect('/admin/usuarios')
                })
                .catch(err => {
                    console.log(err);
                    res.json(false)
                })
        }
    }

    allUsers(req, res) {
        let id_gerente = cache.get('id_gerente');

        if (id_gerente != null && id_gerente != '') {
            axios.post(`${urls}allUsers`, {
                id: id_gerente
            })
                .then(resp => {
                    console.log("Tabela consultada com sucesso!");
                    res.json(resp.data)
                })
                .catch(err => {
                    console.log(err);
                    res.json(false);
                })
        } else {
            console.log("Tentativa de consulta indevida");
            res.json(false);
        };
    }

    clientesTotais(req, res) {
        axios.get(`${urls}allClientes`)
            .then(resp => {
                res.json(resp.data)
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })
    }

    consultUser(req, res) {
        let id_gerente = cache.get('id_gerente');
        let id_consult = req.params.id;

        if (id_gerente != null && id_gerente != '') {
            axios.post(`${urls}usuarioInfo`, {
                id: id_consult
            })
                .then(resp => {
                    res.json(resp.data)
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }

    todosUsuariosPedido(req, res) {
        axios.get(`${urls}allUsersPedidos`)
            .then(users => {
                res.json(users.data)
            }).catch(err => {
                console.log(err);
                res.json(false)
            })
    }


    // DISTRIBUIDORES
    novoUsuarioParaDistribuidor(req, res){
        
        let newUser = {
            idDistri: req.body.distribuidor,
            nome: req.body.nome,
            email: req.body.email,
            endereco: req.body.endereco,
            phone: req.body.phone,
            cpf: req.body.cpf,
            instagram: req.body.instagram,
            facebook: req.body.facebooks,
            funcao: req.body.funcao,
            regiao: req.body.regiao,
            representante: req.body.Representante,

        }

        axios.post(`${urls}novoUsuarioParaDistribuidor`, newUser)
                .then(resp => {
                    axios.post(`${urls}usuarioInfo`, {
                        id: resp.data
                    })
                        .then(resp => {
                            console.log('OK')
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    res.redirect('/distribuidor/usuarios');
                })
                .catch(err => {
                    console.log(err);
                    res.json(false)
                })
        
    }

    // VENDEDORES
    novoUsuarioParaVendedores(req, res){
        let newUser = {
            idVendedor: req.body.idDoVendedor,
            nome: req.body.nome,
            email: req.body.email,
            endereco: req.body.endereco,
            phone: req.body.phone,
            cpf: req.body.cpf,
            instagram: req.body.instagram,
            facebook: req.body.facebook,
            funcao: req.body.funcao,
            regiao: req.body.regiao
        }

        console.log(newUser);
        

        axios.post(`${urls}novoUsuarioParaVendedores`, newUser)
            .then(resp => {
                axios.post(`${urls}usuarioInfo`, {
                    id: resp.data
                })
                    .then(resp => {
                        console.log('OK')
                    })
                    .catch(err => {
                        console.log(err);
                    })
                res.redirect('/vendedores/clientes');
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })

    }

    
}



module.exports = new ApiControllerUsuarios()