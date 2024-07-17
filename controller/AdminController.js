const cache = require('../configs/cache')

class AdminController{

    // FINANCEIRO
    financeiroIndex(req, res){ 
        res.render('admin/financeiro/index', {Id_User: req.Id_User});
    }

    entregasIndex(req, res) {
        res.render('admin/financeiro/entregas/index', {Id_User: req.Id_User});
    }

    vendasIndex(req, res){
        res.render('admin/financeiro/vendas/index', {idUser: req.Id_User});
    }

    devedoresIndex(req, res) {
        res.render('admin/financeiro/devedores/index', {idUser: req.Id_User});
    }

    dividasIndex(req, res){
        res.render('admin/financeiro/dividas/index', {idUser: req.Id_User});
    }

    adicionarDivida(req, res){
        res.render('admin/financeiro/dividas/adicionarDivida', {idUser: req.Id_User});
    }

    

    
    // END FINANCEIRO

    produtoIndex(req, res){
        res.render('admin/produtos/index', {Id_User: req.Id_User})
    }

    

    usuariosIndex(req, res) {
        res.render('admin/usuarios/index', {Id_User: req.Id_User})
    }

    futurosClientes(req, res){
        res.render('admin/usuarios/futurosClientes', {Id_User:req.id_User});
    }



    adicionarUsuario(req, res){
        res.render('admin/usuarios/adicionarUsuario', {Id_User: req.Id_User})
    }

    adicionarProduto(req, res) {
        res.render('admin/produtos/adicionarProduto', {Id_User: req.Id_User})
    }


    // PEDIDOS

    pedidosIndex(req, res) {
        res.render('admin/pedidos/index', {Id_User: req.Id_User})
    }

    efetuarPedido(req, res){
        res.render('admin/pedidos/efetuarPedido/index', {Id_User: req.Id_User})
    }

    pedidosConcluidos(req, res){
        res.render('admin/pedidos/pedidosConcluidos/index', {Id_User: req.Id_User})
    }

    aprovarPedido(req, res){
        res.render('admin/pedidos/aprovacao/index', {Id_User: req.Id_User})
    }

    pedidoEnviado(req, res){
        res.render('admin/pedidos/pedidoEnviado/index', {Id_User: req.Id_User})
    }
    // END PEDIDOS


    // PRODUTOS

    brindesIndex(req, res){
        res.render('admin/produtos/brindes/index', {Id_User: req.Id_User})
    }

    materiaisIndex(req, res){
        res.render('admin/produtos/materiais/index', {Id_User: req.Id_User})
    }
   
}

module.exports = new AdminController()