require('dotenv').config();

const axios = require('axios');
const cache = require('../configs/cache');
const { use } = require('../routes');
const { ecryptedIdUser, decryptUserId } = require('../configs/cripto');

// Base da URL
const urls = "http://localhost:200/users/"

// Controller
class ApiControllerUsuarios {
    addUser(req, res) {
        let newUser = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.password,
            funcao: req.body.funcao,
            cep: parseInt(req.body.cep.replace(/[^\d]/g, '')),
            bairro: req.body.bairro,
            numero_endereco: parseInt(req.body.numerodoendereco),
            endereco: req.body.endereco,
            regiao: req.body.regiao,
            cpf: req.body.cpf.replace(/[^\d]/g, ''),
            telefone: req.body.telefone.replace(/[^\d]/g, ''),
            insta: req.body.instagram,
            face: req.body.facebooks,
            nascimento: req.body.nascimento.replace(/[^\d]/g, '')
        };


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
                    res.redirect(`/admin/usuarios?user=${req.Id_User}`);
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
        const user = {
            email: req.body.email,
            senha: req.body.senha.toString()
        };
        
        axios.post(`${urls}login`, {
            email: `${user.email}`,
            password: `${user.senha}`
        },{
            rejectUnauthorized: false
          })
            .then(resp => { 
                const auth = resp.data.auth;
                const identificador = auth.slice(0, 6);
                
                switch (resp.data.user.funcao) {
                    case 'Gerente':
                        cache.set(identificador, auth)
                        return res.redirect(307, `/users?user=${identificador}`);
                    case '2':
                        // const idCriptografadoDistribuidor = ecryptedIdUser(resp.data.id_usuario, process.env.SECRET_KEY);
                        return res.redirect(`/distribuidor?user=${resp.data.user.id_usuario}`);

                    case '3':
                        // const idCriptografadoVendedor = ecryptedIdUser(resp.data.id_usuario, process.env.SECRET_KEY);
                        return res.redirect(`/vendedores?user=${resp.data.user.id_usuario}`);


                    case '6':
                        const idCriptografadoRepresentante = ecryptedIdUser(resp.data.id_usuario, process.env.SECRET_KEY);
                        return res.status(404).send("<script>alert('Função não cadastrada para utilização do sistema'); window.history.back();</script>")

                    case '7':
                        // const idCriptografadoAfiliado = ecryptedIdUser(resp.data.id_usuario, process.env.SECRET_KEY);
                        return res.status(404).send("<script>alert('Função não cadastrada para utilização do sistema'); window.history.back();</script>")

                    default:
                        return res.status(404).send("<script>alert('Função não encontrado'); window.history.back();</script>")
                }
            })
            .catch(err => {
                console.log(err)

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
                    res.redirect(`/admin/usuarios?user=${req.Id_User}`)
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
        res.render('admin/usuarios/editarUsuario', { id, Id_User: req.Id_User })
    }

    editUser(req, res) {
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

        axios.post(`${urls}editUser`, newUser)
            .then(resp => {
                res.redirect(`/admin/usuarios?user=${req.Id_User}`)
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })
    }

    allUsers(req, res) {
        let id_gerente = cache.get(`${req.Id_User}`);
  
            axios.post(`${urls}allUsers`, {
                id: id_gerente
            })
                .then(resp => {
                    console.log("Tabela consultada com sucesso!");
                    res.json(resp.data);
                })
                .catch(err => {
                    console.log(err);
                    res.json(false);
                })
    }

    usuariosPedidos(req, res){
        let funcaoUsuario = req.params.funcao;
        axios.get(`${urls}usuariosPedidos/${funcaoUsuario}`)
            .then(resp => {
                res.json(resp.data)
                res.status(200);
            }).catch(err =>{

            })
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
        let id_consult = cache.get(`${req.Id_User}`);

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

    todosUsuariosPedido(req, res) {
        const funcaoUsuario = req.params.funcao;

        axios.get(`${urls}allUsersPedidos/${funcaoUsuario}`)

        // const funcaoSelecionada = req.body.funcaoValue;

        // axios.post(`${urls}allUsersPedidos`, {
        //     funcao: funcaoSelecionada
        // })

            .then(users => {
                res.json(users.data)
            }).catch(err => {
                console.log(err);
                res.json(false)
            })
    }


    // DISTRIBUIDORES
    novoUsuarioParaDistribuidor(req, res){
        const idCripted = req.query.user;

        let newUser = {
            idDistri: req.body.distribuidor,
            nome: req.body.nome,
            funcao: req.body.funcao,
            email: req.body.email,
            nascimento: req.body.nascimento.replace(/[^\d]/g, ''),
            cpf: req.body.cpf.replace(/[^\d]/g, ''),
            telefone: req.body.telefone.replace(/[^\d]/g, ''),
            cep: req.body.cep.replace(/[^\d]/g, ''),
            endereco: req.body.endereco,
            bairro: req.body.bairro,
            numerodoendereco: parseInt(req.body.numerodoendereco),
            regiao: req.body.regiao,
            instagram: req.body.instagram,
            facebook: req.body.facebooks,
        }

        // console.log(newUser);
        // return;

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
                    res.redirect(`/distribuidor/usuarios?user=${idCripted}`);
                })
                .catch(err => {
                    console.log(err);
                    res.json(false)
                })
        
    }

    // VENDEDORES
    novoUsuarioParaVendedores(req, res){
        const idCripted = req.query.user;

        let newUser = {
            idVendedor: req.body.idDoVendedor,
            nome: req.body.nome,
            funcao: req.body.funcao,
            email: req.body.email,
            nascimento: req.body.nascimento.replace(/[^\d]/g, ''),
            cep: req.body.cep.replace(/[^\d]/g, ''),
            cpf: req.body.cpf.replace(/[^\d]/g, ''),
            telefone: req.body.telefone.replace(/[^\d]/g, ''),
            endereco: req.body.endereco,
            bairro: req.body.bairro,
            numero_endereco: parseInt(req.body.numerodoendereco),
            regiao: req.body.regiao,
            instagram: req.body.instagram,
            facebook: req.body.facebook,
        }

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
                res.redirect(`/vendedores/clientes?user=${idCripted}`);
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })

    }

    
}



module.exports = new ApiControllerUsuarios()