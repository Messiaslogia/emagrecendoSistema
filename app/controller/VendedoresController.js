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

    editIndex(req, res){
        let id = req.params.id

        res.render('vendedores/clientes/editarUsuario', { id })
    }

    editUser(req, res) {

        let newUser = {
            id: req.params.id,
            nome: req.body.nome,
            email: req.body.email,
            password: req.body.senha,
            cpf: req.body.cpf,
            insta: req.body.instagram,
            face: req.body.facebooks,
            funcao: req.body.funcao,
            regiao: req.body.regiao,
            telefone: req.body.telefone
        };

            axios.post(`http://localhost:200/users/editUser`, newUser)
                .then(resp => {
                    console.log('truco')
                    res.redirect('/vendedores/clientes')
                })
                .catch(err => {
                    console.log(err);
                    res.json(false)
                })
    }

    futurosClientes(req, res){
        var idDoVendedor = cache.get('id_vendedor');
        res.render('vendedores/futurosClientes/index', { idDoVendedor })
    }

    adicionarUsuario(req, res){
        var idDoVendedor = cache.get('id_vendedor');
        res.render('vendedores/clientes/adicionarUsuario', { idDoVendedor });
    }

    dellCliente(req, res){
        let id = req.params.id;
        let idDoVendedor = cache.get('id_vendedor');

        axios.post(`${urls}deletarCliente`, {
            id: id
        })
        .then(resp => {
            res.render('vendedores/clientes/index', { idDoVendedor });
        })
        .catch(err => {
            console.log(err)
        })
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

    dividasGerais(req, res){
        var idDoVendedor = cache.get('id_vendedor');
        res.render('vendedores/vendas/dividasGerais', { idDoVendedor });
    }

    vendasEfetuadas(req, res){
        var idDoVendedor = cache.get('id_vendedor');
        res.render('vendedores/vendas/vendasReais', { idDoVendedor });
    }

    adicionarVendas(req, res){
        var idDoVendedor = cache.get('id_vendedor');
        res.render('vendedores/vendas/vendasReais/adicionarVenda', { idDoVendedor });
    }

    registrarVendas(req, res){
        let novaVenda = {
            idVendedor: req.body.idVendedor,
            idCliente: req.body.usuario,
            idProduto: req.body.produto,
            valorUnitario: parseFloat(req.body.valorVenda.replace('R$ ', '')),
            quantidade: req.body.quantidadeVenda,
            valorTotal: parseFloat(req.body.valorVenda.replace('R$ ', '')) * req.body.quantidadeVenda,
            data: req.body.dataVenda,
        };

        
        axios.post(`${urls}adicionarVenda`, novaVenda) 
            .then(resp => {
                res.redirect('/vendedores/vendasEfetuadas')
            })
    }

    registrarPedidos( req, res ){

        let newPedido = {
            id_produto_FK: req.body.produto,
            id_usuario_FK: req.body.usuario,
            pedido: req.body.pedido,
            status: req.body.status,
            valor: req.body.somaValorPedido,
            valorUnico: req.body.valorProduto.replace('R$ ', ''),
            data: req.body.dataProduto,
            hora: req.body.horaProduto,
            quantidade: req.body.quantidade
        };

        axios.post(`http://localhost:200/pedidos/addPedidos`, newPedido)
            .then(resp => {
                res.json(true);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })
    }

    adicionarDividasGerais(req, res){
        var idDoVendedor = cache.get('id_vendedor');
        res.render('vendedores/vendas/dividasGerais/adicionarVenda', { idDoVendedor });
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

    adicionarVenda(req, res){
        let novaVenda = {
            id_vendedor_FK: req.body.idVendedor,
            id_cliente_FK: req.body.usuario,
            id_produto_FK: req.body.produto,
            quantidade_total: req.body.quantidadeVenda,
            valor_unitario: req.body.valorVenda,
            valor_total: '',
            data: req.body.dataVenda
        }

        axios.post(`${urls}novaVenda`, novaVenda)
            .then(resp => {
                res.redirect('http://localhost:3000/vendedores/vendasEfetuadas')
            })
            .catch(err => {
                res.json(false)
            })
    }
}

module.exports = new VendedoresController;