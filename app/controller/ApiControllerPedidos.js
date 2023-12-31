const axios = require('axios')
const cache = require('../configs/cache');
const { use } = require('../routes');

// Base da URL
const urls = "http://localhost:200/pedidos/"

// Controller
class ApiControllerPedidos {

    addPedidos( req, res ){
        console.log(req.body)

        let newPedido = {
            id_produto_FK: req.body.produto,
            id_usuario_FK: req.body.usuario,
            pedido: req.body.pedido,
            status: req.body.status,
            valor: req.body.somaValorPedido,
            data: req.body.dataProduto,
            hora: req.body.horaProduto,
            quantidade: req.body.quantidade  
        }

        axios.post(`${urls}addPedidos`, newPedido) 
            .then(resp => {
                res.json(true);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })
    }

    allPedidos( req, res ){
        axios.get(`${urls}allPedidos`)
            .then( resp => {
                res.json(resp.data)
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })
    }

    allPedidosAceitos( req, res ){
        axios.get(`${urls}allPedidosAceitos`)
            .then( resp => {
                res.json(resp.data)
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })
    }

    allPedidosEntregues( req, res ){
        axios.get(`${urls}allPedidosEntregues`)
            .then( resp => {
                res.json(resp.data)
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })
    }

    newStatus( req, res ){
        axios.post(`${urls}atualizarStatus`, {
            status: req.body.status,
            pedido: req.body.pedido,
            pagamento: req.body.pagamento
        })
            .then(resp => {
                res.json(true);
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })
    }

    enviarProdutoIndex( req, res ){
        let pedido = req.params.numero

        res.render('admin/pedidos/enviarProduto/formEnviarProduto', {pedido})

        // axios.post(`${urls}atualizarStatus`, {
        //     numero: req.params.numero,
        //     status: req.body.status,
        //     pedido: req.body.pedido,
        //     pagamento: req.body.pagamento
        // })
        //     .then(resp => {
        //         res.json(true);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         res.json(false)
        //     })
    }

    novaEntrega( req, res ){
        axios.post(`${urls}novaEntrega`, {
            numero: req.body.numero_do_pedido,
            codigo: req.body.codigo_rastreio,
            empresa: req.body.empresa,
            data: req.body.dataEntrega,
        })
            .then(resp => {
                res.redirect('/admin/pedidosConcluidos');
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })
    }

    dellPedidos( req, res ){
        axios.post(`${urls}dellPedido`, {
            pedidos: req.params.pedidos
        })
            .then(resp => {
                res.redirect('/admin/aprovarPedido')
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })
    }

    consultTotal( req, res ){
        axios.get(`${urls}valorTotal`)
            .then(resp => {
                console.log(resp.data)

                res.json(resp.data)
            })
            .catch(err => {

            })
    }

    quantidadeTotal( req, res ){
        axios.get(`${urls}quantidadeTotal`)
            .then(resp => {
                console.log(resp.data)
                res.json(resp.data)
            })
            .catch( err => {
                console.log(err)
            })
    }
}

module.exports = new ApiControllerPedidos