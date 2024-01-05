const axios = require('axios')
const cache = require('../configs/cache');
const { use } = require('../routes');

// Base da URL
const urls = "http://localhost:200/users/"

// Variáveis Globais
let usersList = [];

// Controller
class ApiControllerUsuarios {
    addUser(req, res) {
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


        if (id_user != null && id_user != '') {
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
                    let id = parseInt(usuario)

                    // Tirando o usuário do array global
                    const arrayModificado = usersList.filter(userFromList => userFromList.id_usuario !== id);
                    usersList = arrayModificado
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

    editIndex( req, res ){
        let id = req.params.id

        res.render('admin/usuarios/editarUsuario', {id})
    }

    editUser(req, res) {
        let id_gerente = cache.get('id_gerente');

        let newUser = {
            id: req.params.id,
            nome: req.body.nome,
            email: req.body.email,
            password: req.body.senha,
            cpf: req.body.cpf,
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
                    id: id_gerente,
                    page: req.body.page
                })
                    .then(resp => {
                        console.log("Tabela consultada com sucesso!");
                        let data = resp.data;
                        data.forEach(element => {
                            usersList.push(element);
                        });
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
        let id_gerente = cache.get('id_gerente');
        let clientes = 0;

        if (id_gerente != null && id_gerente != '') {
            axios.post(`${urls}allUsers`, {
                id: id_gerente
            })
                .then(resp => {
                    console.log("Tabela consultada com sucesso!");
                    let data = resp.data;
                    data.forEach(element => {
                        if (element.funcao == "Cliente") {
                            clientes++
                        }
                    });
                    res.json(clientes)
                })
                .catch(err => {
                    console.log(err);
                    res.json(false);
                })
        }
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

    todosUsuariosPedido(req, res){
        axios.get(`${urls}allUsersPedidos`)
        .then( users => {
            res.json(users.data)
        }).catch(err => {
            console.log(err);
            res.json(false)
        })
    }
}



module.exports = new ApiControllerUsuarios()