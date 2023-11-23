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

    adicionarNovoProduto(req, res) {
        const { 
                nomeProduto,
                descricaoProduto,
                quantidadeProduto,
                precoProduto,
                dataProduto,
                horaProduto 
              } = req.body;

        if (
            nomeProduto == undefined || nomeProduto == "" ||
            descricaoProduto == undefined || descricaoProduto == "" ||
            quantidadeProduto == undefined || quantidadeProduto == "" ||
            precoProduto == undefined || precoProduto == "" ||
            dataProduto == undefined || dataProduto == "" ||
            horaProduto == undefined || horaProduto == ""
        ) {
            return res.status(400).send('Dados inválidos.');
        } else if (!req.file) {
            return res.status(400).send('Nenhuma imagem selecionada.');
        } else {
            // Se tudo estiver correto, você pode redirecionar para a página desejada
            console.log(nomeProduto);
            console.log(req.body);
            res.status(200).send('Produto ok');
        }
    }

   
}

module.exports = new AdminController()