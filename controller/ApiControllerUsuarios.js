require('dotenv').config();

const axios = require('axios');
const cache = require('../configs/cache');

// Base da URL
const urls = "https://apiemagrecendo.com/users/"

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

            axios.post(`${urls}newUser`, newUser)
                .then(resp => {
                    axios.post(`${urls}usuarioInfo`, {
                        id: resp.data
                    })
                        .then(() => {
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
                let auth = resp.data.auth;
                let identificador = auth.replace(/[aeiou]/g, '*');
                cache.set(identificador, auth);

                switch (resp.data.user.funcao) {
                    case '1':
                        return res.redirect(307, `/users?user=${identificador}`);
                    case '2':
                        return res.redirect(`/distribuidor?user=${identificador}`);
                    case '3':
                        return res.redirect(`/vendedores?user=${identificador}`);
                    case '6':
                        return res.status(404).send("<script>alert('Função não cadastrada para utilização do sistema'); window.history.back();</script>")

                    case '7':
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
        let usuario = req.params.id;


            axios.post(`${urls}deleteUser`, {
                id: usuario
            })
                .then(() => {
                    res.redirect(`/admin/usuarios?user=${req.Id_User}`)
                })
                .catch(() => {
                    res.json(false)
                })
    }

    editIndex(req, res) {
        let id = req.params.id
        res.render('admin/usuarios/editarUsuario', { id, Id_User: req.Id_User })
    }

    editUser(req, res) {
        let newUser;
        
        if(req.body.password){
            newUser = {
                id: req.params.id,
                nome: req.body.nome,
                email: req.body.email,
                password: req.body.password,
                cpf: req.body.cpf.replace(/[^\d]/g, ''),
                insta: req.body.instagram,
                nascimento: req.body.nascimento.replace(/[^\d]/g, ''),
                face: req.body.facebooks,
                regiao: req.body.regiao,
                cep: req.body.cep.replace(/[^\d]/g, ''),
                endereco: req.body.endereco,
                bairro: req.body.bairro,
                numero_endereco: req.body.numerodoendereco,
                telefone: req.body.telefone
            };
        } else {
            newUser = {
                id: req.params.id,
                nome: req.body.nome,
                email: req.body.email,
                cpf: req.body.cpf,
                cep: req.body.cep.replace(/[^\d]/g, ''),
                nascimento: req.body.nascimento.replace(/[^\d]/g, ''),
                endereco: req.body.endereco,
                bairro: req.body.bairro,
                numero_endereco: req.body.numerodoendereco,
                insta: req.body.instagram,
                face: req.body.facebooks,
                regiao: req.body.regiao,
                telefone: req.body.telefone
            };
        }

        axios.post(`${urls}editUser`, newUser)
            .then(() => {
                res.redirect(`/admin/usuarios?user=${req.Id_User}`)
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })
    }

    allUsers(req, res) {
            axios.post(`${urls}allUsers`)
                .then(resp => {
                    console.log("Tabela consultada com sucesso!");
                    res.json(resp.data);
                })
                .catch(err => {
                    console.log(err);
                    res.json(false);
                })
    }

    todosFuturosClientes(req, res){
        axios.post(`${urls}todosFuturosClientes`)
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
            }).catch(() =>{

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

    totalVendidoDistribuidores(req, res){
        axios.get(`${urls}totalVendidoDistribuidores`)
            .then(resp => {
                res.json(resp.data)
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })
    }

    totalVendidoVendedores(req, res){
        axios.get(`${urls}totalVendidoVendedores`)
            .then(resp => {
                res.json(resp.data)
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })
    }

    infoUsuario(req, res){
        const id_consult = req.query.idUser;

        axios.post(`${urls}usuarioInfoEdit`, {
            id: id_consult
        })
            .then(resp => {
                res.json(resp.data)
            })
            .catch(err => {
                console.log(err);
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
                        .then(() => {
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
        const idCripted = req.Id_User;

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
                    .then(() => {
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