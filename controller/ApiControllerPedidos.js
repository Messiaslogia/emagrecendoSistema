const axios = require('axios')
const cache = require('../configs/cache');
const { use } = require('../routes');

// Base da URL
const urls = "http://localhost:200/pedidos/"



// Controller
class ApiControllerPedidos {

    addPedidos(req, res) {
        console.log(req.body)
        let newPedido = {
            id_produto_FK: req.body.produto,
            id_usuario_FK: req.body.usuario,
            pedido: req.body.pedido,
            status: req.body.status,
            valor: req.body.somaValorPedido,
            valorUnico: req.body.valorProduto.replace('R$ ', '').replace(',', '.'),
            quantidade: req.body.quantidade,
            escolher_usar: req.body.escolher_usar,
            desconto: req.body.desconto.replace('R$ ', '').replace(',', '.'),
        };

        axios.post(`${urls}addPedidos`, newPedido)
            .then(resp => {
                res.json(true);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })
    }

    allPedidos(req, res) {
        axios.get(`${urls}allPedidos`)
            .then(resp => {
                res.json(resp.data)
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })
    }

    allPedidosAceitos(req, res) {
        axios.get(`${urls}allPedidosAceitos`)
            .then(resp => {
                res.json(resp.data)
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })
    }

    allPedidosEntregues(req, res) {
        axios.get(`${urls}allPedidosEntregues`)
            .then(resp => {
                res.json(resp.data)
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })
    }

    newStatus(req, res) {
        axios.post(`${urls}atualizarStatus`, {
            status: req.body.status,
            pedido: req.body.pedido,
            pagamento: req.body.pagamento,
            banco: req.body.banco
        })
            .then(resp => {
                res.json(true);
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })
    }

    enviarProdutoIndex(req, res) {
        let pedido = req.params.numero;
        let id_pedido = req.params.id;
        let id_user = req.query.idUsuario;
        res.render('admin/pedidos/enviarProduto/formEnviarProduto', { pedido, id_pedido, id_user })
    }

    novaEntrega(req, res) {
        axios.post(`${urls}novaEntrega`, {
            id_pedido: req.body.id_pedido,
            id_user: req.body.id_user,
            numero: req.body.numero_do_pedido,
            codigo: req.body.codigo_rastreio,
            valor: req.body.valor_entrega,
            empresa: req.body.empresa,
            endereco: req.body.endereco,
            data: req.body.dataEntrega,
            hora: req.body.horaEntrega
        })
            .then(resp => {
                res.redirect('/admin/pedidosConcluidos');
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })
    }

    dellPedidos(req, res) {
        axios.post(`${urls}dellPedido`, {
            pedidos: req.params.pedidos
        })
            .then(resp => {
                res.send('ok')
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })
    }

    consultTotal(req, res) {
        axios.get(`${urls}valorTotal`)
            .then(resp => {
                res.json(resp.data)
            })
            .catch(err => {

            })
    }

    quantidadeTotal(req, res) {
        axios.get(`${urls}quantidadeTotal`)
            .then(resp => {
                res.json(resp.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    casesPedidosAprovados(req, res) {
        axios.get(`${urls}casesPedidosAprovados`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })
    }

    casesEntregas(req, res) {
        axios.get(`${urls}casesEntregas`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err)
                res.json(false)
            })
    }

    quantidadeTotaldePedidos(req, res){
        axios.get(`${urls}quantidadeTotaldePedidos`)
        .then(resp => {
            
            res.json(resp.data)
        })
        .catch(err => {
            console.log(err);
            res.json(false)
        })
    }

    // DISTRIBUIDORES
    todosOsPedidosDistribuidor(req, res){
        const idDistribuidor = req.query.idDistribuidor;
        axios.get(`${urls}todosPedidosDistribuidor?idDistribuidor=${idDistribuidor}`)
            .then(resp => {
                res.json(resp.data)
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })
    }

    pedidosAprovadosDistribuidor(req, res){
        const idDistribuidor = req.query.idDistribuidor;
        axios.get(`${urls}pedidosAprovadosDistribuidor?idDistribuidor=${idDistribuidor}`)
            .then(resp => {
                res.json(resp.data)
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })
        // const idDistribuidor = req.query.idDistribuidor;
        // console.log(idDistribuidor);
    }

    // VENDEDORES
    todosOsPedidosVendedor(req, res){
        const idVendedor = req.query.idDoVendedor;
        axios.get(`${urls}todosPedidosVendedor?idDoVendedor=${idVendedor}`)
            .then(resp => {
                res.json(resp.data)
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })
    }

    pedidosAprovadosVendedor(req, res){
        const idVendedor = req.query.idVendedor;
        console.log(idVendedor)
        axios.get(`${urls}pedidosAprovadosVendedor?idVendedor=${idVendedor}`)
            .then(resp => {
                res.json(resp.data)
            })
            .catch(err => {
                console.log(err);
                res.json(false)
            })
    }
}

module.exports = new ApiControllerPedidos