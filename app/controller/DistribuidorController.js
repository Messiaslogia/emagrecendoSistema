var cache = require('../configs/cache');
const urls = "http://localhost:200/distribuidores/"
const axios = require('axios')
class DistribuidorController{
    distribuidorIndex(req, res){
        res.render('distribuidores/index');

    }

    usuarios(req, res){
        var idDoDistribuidor = cache.get('id_distribuidor')
        res.render('distribuidores/usuarios/index', { idDoDistribuidor });
    }

    vendas(req, res){
        res.render('distribuidores/vendas/index');
    }

    pedidos(req, res){
        res.render('distribuidores/pedidos/index');

    }

    adicionarUsuario(req, res){
        var idDoDistribuidor = cache.get('id_distribuidor')
        res.render('distribuidores/usuarios/adicionarUsuario',{idDoDistribuidor});
    }

    efetuarPedido(req, res){
        var idDoDistribuidor = cache.get('id_distribuidor')
        res.render('distribuidores/pedidos/efetuarPedido/index', { idDoDistribuidor });

    }

    pedidosConcluidos(req, res){
        var idDoDistribuidor = cache.get('id_distribuidor')
        res.render('distribuidores/pedidos/pedidosConcluidos/index', { idDoDistribuidor });
    }

    aprovarPedido(req, res){
        var idDoDistribuidor = cache.get('id_distribuidor')
        res.render('distribuidores/pedidos/aprovacao/index', { idDoDistribuidor });
    }

    vendasEfetuadas(req, res){
        res.render('distribuidores/vendas/registrarVenda/index');
    }

    dividasPedidos(req, res){
        res.render('distribuidores/vendas/dividasPedidos/index');
    }

    entregasConcluidas(req, res){
        res.render('distribuidores/vendas/entregasConcluidas/index');
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
        console.log(idDistribuidor)
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

}

module.exports = new DistribuidorController()