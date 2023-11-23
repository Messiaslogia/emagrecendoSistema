const cache = require('../configs/cache')

class AdminController{
    financeiroIndex(req, res){
        let id_admin = cache.get('id_gerente');
        res.render('admin/financeiro/index');
    }

    produtoIndex(req, res){
        res.render('admin/produtos/index')
    }

    pedidosIndex(req, res) {
        res.render('admin/pedidos/index')
    }

    usuariosIndex(req, res) {
        res.render('admin/usuarios/index')
    }



    adicionarUsuario(req, res){
        res.render('admin/usuarios/adicionarUsuario')
    }

    adicionarProduto(req, res) {
        res.render('admin/produtos/adicionarProduto')

    }

    adicionarNovoProduto(req, res){
        console.log(req.body)
    }

   
}

module.exports = new AdminController()