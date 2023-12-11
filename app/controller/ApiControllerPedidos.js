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
}

module.exports = new ApiControllerPedidos