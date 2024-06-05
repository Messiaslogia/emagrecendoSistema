
require('dotenv').config();
var cache = require('../configs/cache');
const urls = "http://localhost:200/vendedor/";
const { ecryptedIdUser, decryptUserId } = require('../configs/cripto');




const axios = require('axios') ;

class VendedoresController {

    vendedorIndex(req, res){
        const idDoVendedor = req.query.user;
        const idCripted = req.query.user;
        res.render('vendedores/index', { idDoVendedor, idCripted });
    }

    clientes(req, res){
        const idDoVendedor = req.query.user;
        const idCripted = req.query.user;
        res.render('vendedores/clientes/index', { idDoVendedor, idCripted });
    }

    editIndex(req, res){
        let id = req.params.id
        const idCripted = req.query.user;
        res.render(`vendedores/clientes/editarUsuario`, { id, idCripted })
    }

    editUser(req, res) {
        const idCripted = req.query.user;

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

            axios.post(`http://localhost:200/users/editUser`, newUser)
                .then(resp => {
                    console.log('truco')
                    res.redirect(`/vendedores/clientes?user=${idCripted}`)
                })
                .catch(err => {
                    console.log(err);
                    res.json(false)
                })
    }

    futurosClientes(req, res){
        const idDoVendedor = req.query.user;
        const idCripted = req.query.user;
        res.render('vendedores/futurosClientes/index', { idDoVendedor, idCripted })
    }

    adicionarUsuario(req, res){
        const idDoVendedor = req.query.user;
        const idCripted = req.query.user;
        res.render('vendedores/clientes/adicionarUsuario', { idDoVendedor, idCripted });
    }

    dellCliente(req, res){
        let id = req.params.id;
        const idDoVendedor = req.query.user;
        const idCripted = req.query.user;

        axios.post(`${urls}deletarCliente`, {
            id: id
        })
        .then(resp => {
            res.render('vendedores/clientes/index', { idDoVendedor, idCripted });
        })
        .catch(err => {
            console.log(err)
        })
    }

    vendas(req, res){
        const idDoVendedor = req.query.user;
        const idCripted = req.query.user;
        res.render('vendedores/vendas/index', { idDoVendedor, idCripted });
    }

    pedidos(req, res){
        const idDoVendedor = req.query.user;
        const idCripted = req.query.user;
        res.render('vendedores/pedidos/index', { idDoVendedor, idCripted });
    }

    efetuarPedido(req, res){
        const idDoVendedor = req.query.user;
        const idCripted = req.query.user;
        res.render('vendedores/pedidos/efetuarPedido', { idDoVendedor, idCripted });
    }

    pedidosConcluidos(req, res){
        const idDoVendedor = req.query.user;
        const idCripted = req.query.user;
        res.render('vendedores/pedidos/pedidosConcluidos', { idDoVendedor, idCripted });
    }

    aprovarPedido(req, res){
        const idDoVendedor = req.query.user;
        const idCripted = req.query.user;
        res.render('vendedores/pedidos/aprovacao', { idDoVendedor, idCripted });
    }

    dividasGerais(req, res){
        const idDoVendedor = req.query.user;
        const idCripted = req.query.user;
        res.render('vendedores/vendas/dividasGerais', { idDoVendedor, idCripted });
    }

    vendasEfetuadas(req, res){
        const idDoVendedor = req.query.user;
        const idCripted = req.query.user;
        res.render('vendedores/vendas/vendasReais', { idDoVendedor, idCripted });
    }

    adicionarVendas(req, res){
        const idDoVendedor = req.query.user;
        const idCripted = req.query.user;
        res.render('vendedores/vendas/vendasReais/adicionarVenda', { idDoVendedor, idCripted });
    }

    registrarVendas(req, res){
        const idCripted = req.query.user;

        let novaVenda = {
            idVendedor: req.body.idVendedor,
            idCliente: req.body.usuario,
            idProduto: req.body.produto,
            valorUnitario: parseFloat(req.body.valorVenda.replace('R$ ', '')),
            quantidade: req.body.quantidadeVenda,
            valorTotal: parseFloat(req.body.valorVenda.replace('R$ ', '')) * req.body.quantidadeVenda,
            data: req.body.dataVenda,
        };

        
        axios.post(`${urls}adicionarVenda`, novaVenda) 
            .then(resp => {
                res.redirect(`/vendedores/vendasEfetuadas?user=${idCripted}`)
            })
    }

    registrarPedidos( req, res ){

        let newPedido = {
            id_produto_FK: req.body.produto,
            id_usuario_FK: req.body.usuario,
            pedido: req.body.pedido,
            status: req.body.status,
            valor: req.body.somaValorPedido,
            valorUnico: req.body.valorProduto.replace('R$ ', ''),
            data: req.body.dataProduto,
            hora: req.body.horaProduto,
            quantidade: req.body.quantidade
        };

        axios.post(`http://localhost:200/pedidos/addPedidos`, newPedido)
            .then(resp => {
                res.json(true);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })
    }

    adicionarDividasGerais(req, res){
        const idDoVendedor = req.query.user;
        const idCripted = req.query.user;
        res.render('vendedores/vendas/dividasGerais/adicionarVenda', { idDoVendedor, idCripted });
    }

    dividasPedidos(req, res){
        const idDoVendedor = req.query.user;
        const idCripted = req.query.user;
        res.render('vendedores/vendas/dividasPedidos', { idDoVendedor, idCripted });
    }

    entregasConcluidas(req, res){
        const idDoVendedor = req.query.user;
        const idCripted = req.query.user;
        res.render('vendedores/vendas/entregasConcluidas', { idDoVendedor, idCripted });
    }

    todosUsuariosVendedor(req, res){
        const idVendedor = req.query.idVendedor;
        axios.get(`${urls}todosUsuariosVendedor?idVendedor=${idVendedor}`)
            .then(users => {
                res.json(users.data)
            })
            .catch(err => {
                console.log(`${err} erro ao pegar dados`);
                res.json(false);
            })
    }

    adicionarVenda(req, res){
        const idCripted = req.query.user;

        let novaVenda = {
            id_vendedor_FK: req.body.idVendedor,
            id_cliente_FK: req.body.usuario,
            id_produto_FK: req.body.produto,
            quantidade_total: req.body.quantidadeVenda,
            valor_unitario: req.body.valorVenda,
            valor_total: '',
            data: req.body.dataVenda
        }

        axios.post(`${urls}novaVenda`, novaVenda)
            .then(resp => {
                res.redirect(`http://localhost:3030/vendedores/vendasEfetuadas?user=${idCripted}`)
            })
            .catch(err => {
                res.json(false)
            })
    }
}

module.exports = new VendedoresController;