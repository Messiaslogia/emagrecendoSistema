var cache = require('../configs/cache');
const urls = "http://localhost:200/vendedor/";
const axios = require('axios') ;

class VendedoresController {

    vendedorIndex(req, res){
        var idDoVendedor = cache.get('id_vendedor');

        res.render('vendedores/index', { idDoVendedor });
    }

    clientes(req, res){
        var idDoVendedor = cache.get('id_vendedor');
        res.render('vendedores/clientes/index', { idDoVendedor });
    }

    futurosClientes(req, res){
        var idDoVendedor = cache.get('id_vendedor');
        res.render('vendedores/futurosClientes/index', { idDoVendedor })
    }

    adicionarUsuario(req, res){
        var idDoVendedor = cache.get('id_vendedor');
        res.render('vendedores/clientes/adicionarUsuario', { idDoVendedor });
    }

    vendas(req, res){
        var idDoVendedor = cache.get('id_vendedor');
        res.render('vendedores/vendas/index', { idDoVendedor });
    }

    pedidos(req, res){
        var idDoVendedor = cache.get('id_vendedor');
        res.render('vendedores/pedidos/index', { idDoVendedor });
    }

    efetuarPedido(req, res){
        var idDoVendedor = cache.get('id_vendedor');
        res.render('vendedores/pedidos/efetuarPedido', { idDoVendedor });
    }

    pedidosConcluidos(req, res){
        var idDoVendedor = cache.get('id_vendedor');
        res.render('vendedores/pedidos/pedidosConcluidos', { idDoVendedor });
    }

    aprovarPedido(req, res){
        var idDoVendedor = cache.get('id_vendedor');
        res.render('vendedores/pedidos/aprovacao', { idDoVendedor });
    }

    vendasEfetuadas(req, res){
        var idDoVendedor = cache.get('id_vendedor');
        res.render('vendedores/vendas/registrarVenda', { idDoVendedor });
    }

    adicionarDividasGerais(req, res){
        var idDoVendedor = cache.get('id_vendedor');
        res.render('vendedores/vendas/registrarVenda/adicionarVenda', { idDoVendedor });
    }

    dividasPedidos(req, res){
        var idDoVendedor = cache.get('id_vendedor');
        res.render('vendedores/vendas/dividasPedidos', { idDoVendedor });
    }

    entregasConcluidas(req, res){
        var idDoVendedor = cache.get('id_vendedor');
        res.render('vendedores/vendas/entregasConcluidas', { idDoVendedor });
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




}

module.exports = new VendedoresController;