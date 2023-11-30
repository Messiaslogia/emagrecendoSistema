const cache = require('../configs/cache')

class AdminController{

    // FINANCEIRO
    financeiroIndex(req, res){
        let id_admin = cache.get('id_gerente');

        if(id_admin != null || ''){
            res.render('admin/financeiro/index');
        }else{
            res.redirect('/')
        }
    }

    entregasIndex(req, res) {
        res.render('admin/financeiro/entregas/index');
    }

    vendasIndex(req, res){
        res.render('admin/financeiro/vendas/index');
    }

    devedoresIndex(req, res) {
        res.render('admin/financeiro/devedores/index');
    }

    dividasIndex(req, res){
        res.render('admin/financeiro/dividas/index');
    }

    adicionarDivida(req, res){
        res.render('admin/financeiro/dividas/adicionarDivida');
    }

    

    
    // END FINANCEIRO

    produtoIndex(req, res){
        res.render('admin/produtos/index')
    }

    

    usuariosIndex(req, res) {
        res.render('admin/usuarios/index')
    }



    adicionarUsuario(req, res){
        res.render('admin/usuarios/adicionarUsuario')
    }

    adicionarProduto(req, res) {
        res.render('admin/produtos/editarProduto')

    }

    adicionarNovoProduto(req, res){
        console.log(req.body)
    }


    // PEDIDOS

    pedidosIndex(req, res) {
        res.render('admin/pedidos/index')
    }

    efetuarPedido(req, res){
        res.render('admin/pedidos/efetuarPedido/index')
    }

    pedidosConcluidos(req, res){
        res.render('admin/pedidos/pedidosConcluidos/index')
    }

    aprovarPedido(req, res){
        res.render('admin/pedidos/aprovacao/index')
    }

    pedidoEnviado(req, res){
        res.render('admin/pedidos/pedidoEnviado/index')
    }
    // END PEDIDOS

   
}

module.exports = new AdminController()