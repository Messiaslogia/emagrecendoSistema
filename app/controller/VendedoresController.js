var cache = require('../configs/cache');
const urls = "http://localhost:200/vendedores/";
const axios = require('axios') ;

class VendedoresController {

    vendedorIndex(req, res){
        res.render('vendedores/index');
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
}

module.exports = new VendedoresController;