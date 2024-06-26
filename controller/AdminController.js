const cache = require('../configs/cache')

class AdminController{

    // FINANCEIRO
    financeiroIndex(req, res){
        let Id_User = req.query.user;
        let key = cache.get(`${req.query.user}`);

        if(key != null || ''){
            res.render('admin/financeiro/index', {Id_User});
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
        let idUser = req.query.user;
        res.render('admin/financeiro/dividas/index', {idUser});
    }

    adicionarDivida(req, res){
        let idUser = req.query.user;
        res.render('admin/financeiro/dividas/adicionarDivida', {idUser});
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
        res.render('admin/produtos/adicionarProduto')
    }

    adicionarNovoProduto(req, res){
    }


    // PEDIDOS

    pedidosIndex(req, res) {
        let Id_User = cache.get('id_gerente');
        res.render('admin/pedidos/index', {Id_User})
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


    // PRODUTOS

    brindesIndex(req, res){
        res.render('admin/produtos/brindes/index')
    }

    materiaisIndex(req, res){
        res.render('admin/produtos/materiais/index')
    }
   
}

module.exports = new AdminController()