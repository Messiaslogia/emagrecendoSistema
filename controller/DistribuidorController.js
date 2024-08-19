require('dotenv').config();

var cache = require('../configs/cache');
const urls = "http://localhost:200/distribuidores/";
const axios = require('axios');
const { ecryptedIdUser, decryptUserId } = require('../configs/cripto');

class DistribuidorController{

    distribuidorIndex(req, res){
        let idDoDistribuidor = cache.get(req.Id_User);
        let idCripted = req.Id_User;
        res.render('distribuidores/index', { idDoDistribuidor, idCripted });
    }

    usuarios(req, res){
        let idDoDistribuidor = cache.get(req.Id_User);
        let idCripted = req.Id_User;
        res.render('distribuidores/usuarios/index', { idDoDistribuidor, idCripted });
    }

    vendas(req, res){
        let idDoDistribuidor = cache.get(req.Id_User);
        let idCripted = req.Id_User;
        res.render('distribuidores/vendas/index', { idDoDistribuidor, idCripted });
    }

    pedidos(req, res){
        let idDoDistribuidor = cache.get(req.Id_User);
        let idCripted = req.Id_User;
        res.render('distribuidores/pedidos/index', { idDoDistribuidor, idCripted });
    }

    adicionarUsuario(req, res){
        let idDoDistribuidor = cache.get(req.Id_User);
        let idCripted = req.Id_User;
        res.render('distribuidores/usuarios/adicionarUsuario',{idDoDistribuidor, idCripted});
    }

    adicionarVenda(req, res){
        let idDoDistribuidor = cache.get(req.Id_User);
        let idCripted = req.Id_User;
        res.render('distribuidores/vendas/realVendas/adicionarVenda',{idDoDistribuidor, idCripted});
    }

    adicionarVendaPost(req, res){
        const idCripted = req.Id_User; 

        let novaVenda = {
            idDistribuidor: req.body.idDistribuidor,
            idCliente: req.body.usuario,
            idProduto: req.body.produto,
            valorUnitario: parseFloat(req.body.valorVenda.replace('R$ ', '')),
            quantidade: req.body.quantidadeVenda,
            valorTotal: parseFloat(req.body.valorVenda.replace('R$ ', '')) * req.body.quantidadeVenda,
            data: req.body.dataVenda,
        };
        
        axios.post(`${urls}adicionarVenda`, novaVenda) 
            .then(resp => {
                res.redirect(`/distribuidor/vendasRegistro?user=${idCripted}`)
            })
    }

    dellVendas(req, res){
        const idCripted = req.query.user;
        const idVenda = req.params.idVenda;
    }

    adicionarDividaGeral(req, res){
        let idDoDistribuidor = cache.get(req.Id_User);
        let idCripted = req.Id_User;
        res.render('distribuidores/vendas/registrarVenda/adicionarVenda',{idDoDistribuidor, idCripted});
    }

    adicionarEntrega(req, res){
        let idDoDistribuidor = cache.get(req.Id_User);
        let idCripted = req.Id_User;
        res.render('distribuidores/vendas/entregasClientes/adicionarEntrega', { idDoDistribuidor, idCripted });
    }

    efetuarPedido(req, res){
        let idDoDistribuidor = cache.get(req.Id_User);
        let idCripted = req.Id_User;
        res.render('distribuidores/pedidos/efetuarPedido/index', { idDoDistribuidor, idCripted });

    }

    pedidosConcluidos(req, res){
        let idDoDistribuidor = cache.get(req.Id_User);
        let idCripted = req.Id_User;
        res.render('distribuidores/pedidos/pedidosConcluidos/index', { idDoDistribuidor, idCripted });
    }

    aprovarPedido(req, res){
        let idDoDistribuidor = cache.get(req.Id_User);
        let idCripted = req.Id_User;
        res.render('distribuidores/pedidos/aprovacao/index', { idDoDistribuidor, idCripted });
    }

    indexVendas(req, res){
        let idDoDistribuidor = cache.get(req.Id_User);
        let idCripted = req.Id_User;
        res.render('distribuidores/vendas/realVendas', { idDoDistribuidor, idCripted });
    }

    vendasEfetuadas(req, res){
        var idUser = cache.get(req.Id_User);
        let idCripted = req.Id_User;
        res.render('distribuidores/vendas/registrarVenda/index', { idUser, idCripted });
    }

    entregasClientes(req, res){
        var idUser = cache.get(req.Id_User);
        let idCripted = req.Id_User;
        res.render('distribuidores/vendas/entregasClientes/index', { idUser, idCripted });
    }

    dividasPedidos(req, res){
        var idUser = cache.get(req.Id_User);
        let idCripted = req.Id_User;
        res.render('distribuidores/vendas/dividasPedidos/index', { idUser, idCripted });
    }

    entregasConcluidas(req, res){
        var idUser = cache.get(req.Id_User);
        let idCripted = req.Id_User;
        res.render('distribuidores/vendas/entregasConcluidas/index', { idUser, idCripted });
    }

    todosRepresentantes(req, res) {
        const idDistribuidor = req.query.idDistribuidor; 

        axios.get(`${urls}todosRepresentantes?idDistribuidor=${idDistribuidor}`)
            .then(resp => {
                let data = resp.data;
                res.json(data);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            }) 
    }

    todosUsuariosDistribuidores(req, res){
        const idDistribuidor = req.query.idDistribuidor;

        axios.get(`${urls}todosUsuariosDosDistribuidores?idDistribuidor=${idDistribuidor}`)
            .then(users => {
                res.json(users.data)
            })
            .catch(err => {
                console.log(`${err} erro ao pegar dados`);
                res.json(false);
            })
    }

    usuarioPedidos(req, res){
        let id = req.query.idDistribuidor;

        axios.get(`${urls}usuarioPedidos?idDistribuidor=${id}`)
            .then(users => {
                res.json(users.data)
            })
            .catch(err => {
                console.log(`${err} erro ao pegar dados`);
                res.json(false);
            })
    }

    editIndex(req, res){
        const id = req.params.id
        const idCripted = req.Id_User;
        res.render('distribuidores/usuarios/editarUsuario', { id, idCripted });
    }

    
    editEntregaRepresentantes(req, res){
        const idCripted = req.Id_User;
        const entregaID = req.query.entrega;
        res.render('distribuidores/vendas/entregasClientes/editarVenda', { idCripted, entregaID })
    }

    editEntregaRepresentantesPost(req, res){
        const idDistribuidor = req.Id_User;
        const entrega = req.query.entrega;
        const updateEntrega = {
            numero_pedido : req.body.numero_pedido,
            nome_empresa : req.body.nome_empresa,
            valor_entrega : req.body.valor_entrega,
            status : req.body.status_entrega,
        }

        axios.post(`${urls}/editEntrega?entrega=${entrega}`, updateEntrega)
            .then((result) => {
                res.redirect(`/distribuidor/entregasClientes?user=${idDistribuidor}`);
            }).catch((err) => {
                console.log(err);
            });
    }

    editUser(req, res) {
        const idCripted = req.Id_User; 

        const newUser = {
            id: req.params.id,
            nome: req.body.nome,
            email: req.body.email,
            password: req.body.senha,
            telefone: req.body.telefone,
            cpf: req.body.cpf,
            cep:req.body.cep,
            endereco: req.body.endereco,
            bairro: req.body.bairro,
            numero_endereco: req.body.numerodoendereco,
            regiao: req.body.regiao,
            insta: req.body.instagram,
            face: req.body.facebooks,
        };

        axios.post(`${urls}editUser`, newUser)
            .then(resp => {
                res.redirect(`/distribuidor/usuarios?user=${idCripted}`)
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })
    }

    cadastrarEntregaRepresentante(req, res) {
        // Capturando os valores enviados pelo formulário
        const { idUser, usuario, empresa_responsavel, numero_pedido, valor_entrega, status_entrega } = req.body;


        const dadosEntrega = {
            idCripted: req.Id_User,
            idUser : idUser,
            numero_pedido: numero_pedido,
            idRepresentante: usuario,
            empresaResponsavel: empresa_responsavel,
            valor_entrega: valor_entrega,
            status_entrega: status_entrega
        };

        // Aqui você pode adicionar a lógica para salvar esses dados no banco de dados ou realizar outras ações
        axios.post(`${urls}cadastrarEntregaRepresentante`,{
            dadosEntrega: dadosEntrega
        })
            .then(resp=>{
                res.redirect(`/distribuidor/entregasClientes?user=${req.Id_User}`)
            })
        
    }



    dellUser(req, res) {
        const usuario = req.params.id;
        const idCripted = req.Id_User;

        axios.post(`http://localhost:200/users/deleteUser`, {
            id: usuario
        })
            .then(resp => {
                res.redirect(`/distribuidor/usuarios?user=${idCripted}`)
            })
            .catch(err => {
                res.json(false)
            })
    }

}

module.exports = new DistribuidorController()