
require('dotenv').config();
var cache = require('../configs/cache');
const urls = "https://apiemagrecendo.com/vendedor/";
const { ecryptedIdUser, decryptUserId } = require('../configs/cripto');




const axios = require('axios') ;

class VendedoresController {

    vendedorIndex(req, res){
        const idDoVendedor = cache.get(req.Id_User);
        const idCripted = req.Id_User;
        res.render('vendedores/index', { idDoVendedor, idCripted });
    }

    clientes(req, res){
        const idDoVendedor = req.Id_User;
        const idCripted = req.Id_User;
        res.render('vendedores/clientes/index', { idDoVendedor, idCripted });
    }

    editIndex(req, res){
        let id = req.params.id
        const idCripted = req.Id_User;
        res.render(`vendedores/clientes/editarUsuario`, { id, idCripted })
    }

    editUser(req, res) {
        const idCripted = req.Id_User;

        let newUser
        if(req.body.senha){
            newUser = {
                id: req.params.id,
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
                telefone: req.body.telefone,
                nascimento: req.body.nascimento,
                cpf: req.body.cpf,
                cep:req.body.cep,
                endereco: req.body.endereco,
                bairro: req.body.bairro,
                numero_endereco: req.body.numerodoendereco,
                regiao: req.body.regiao,
                insta: req.body.instagram,
                face: req.body.facebooks,
            };
        }else {
            newUser = {
                id: req.params.id,
                nome: req.body.nome,
                email: req.body.email,
                nascimento: req.body.nascimento,
                telefone: req.body.telefone,
                cpf: req.body.cpf,
                cep:req.body.cep,
                endereco: req.body.endereco,
                bairro: req.body.bairro,
                numero_endereco: req.body.numerodoendereco,
                regiao: req.body.regiao,
                insta: req.body.instagram,
                face: req.body.facebooks,
            };
        };

            axios.post(`https://apiemagrecendo.com/users/editUser`, newUser)
                .then(resp => {
                    res.redirect(`/vendedores/clientes?user=${idCripted}`)
                })
                .catch(err => {
                    console.log(err);
                    res.json(false)
                })
    }

    futurosClientes(req, res){
        const idDoVendedor = req.Id_User;
        const idCripted = req.Id_User;
        res.render('vendedores/futurosClientes/index', { idDoVendedor, idCripted })
    }

    adicionarUsuario(req, res){
        const idDoVendedor = cache.get(req.Id_User);
        const idCripted = req.Id_User;
        res.render('vendedores/clientes/adicionarUsuario', { idDoVendedor, idCripted });
    }

    dellCliente(req, res){
        let id = req.params.id;
        const idDoVendedor = req.Id_User;
        const idCripted = req.Id_User;

        axios.post(`${urls}deletarCliente`, {
            id: id
        })
        .then(resp => {
            res.render('vendedores/clientes/index', { idDoVendedor, idCripted });
        })
        .catch(err => {
            console.log(err)
        })
    }

    vendas(req, res){
        const idDoVendedor = cache.get(req.Id_User);
        const idCripted = req.Id_User;
        res.render('vendedores/vendas/index', { idDoVendedor, idCripted });
    }

    pedidos(req, res){
        const idDoVendedor = cache.get(req.Id_User);
        const idCripted = req.Id_User;
        res.render('vendedores/pedidos/index', { idDoVendedor, idCripted });
    }

    efetuarPedido(req, res){
        const idDoVendedor = cache.get(req.Id_User);
        const idCripted = req.Id_User;
        res.render('vendedores/pedidos/efetuarPedido', { idDoVendedor, idCripted });
    }

    pedidosConcluidos(req, res){ 
        const idDoVendedor = cache.get(req.Id_User);
        const idCripted = req.Id_User;
        res.render('vendedores/pedidos/pedidosConcluidos', { idDoVendedor, idCripted });
    }

    aprovarPedido(req, res){
        const idDoVendedor = cache.get(req.Id_User);
        const idCripted = req.Id_User;
        res.render('vendedores/pedidos/aprovacao', { idDoVendedor, idCripted });
    }

    dividasGerais(req, res){
        const idDoVendedor = cache.get(req.Id_User);
        const idCripted = req.Id_User;
        res.render('vendedores/vendas/dividasGerais', { idDoVendedor, idCripted });
    }

    vendasEfetuadas(req, res){
        const idDoVendedor = cache.get(req.Id_User);
        const idCripted = req.Id_User;
        res.render('vendedores/vendas/vendasReais', { idDoVendedor, idCripted });
    }

    adicionarVendas(req, res){
        const idDoVendedor = cache.get(req.Id_User);
        const idCripted = req.Id_User;
        res.render('vendedores/vendas/vendasReais/adicionarVenda', { idDoVendedor, idCripted });
    }

    registrarVendas(req, res){
        const idCripted = req.Id_User;

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
                res.redirect(`/vendedores/vendasEfetuadas?user=${idCripted}`)
            })
    }

    registrarPedidos( req, res ){
        const vendedor = req.body.vendedor;
        let newPedido = {
            id_produto_FK: req.body.produto,
            id_vendedor_FK: req.body.vendedor,
            id_usuario_FK: req.body.usuario,
            pedido: req.body.pedido,
            status: req.body.status,
            quantidade: req.body.quantidade,
            valor: req.body.somaValorPedido,
            valorUnico: req.body.valorProduto.replace('R$ ', ''),
        };

        axios.post(`https://apiemagrecendo.com/pedidos/addPedidosVendedores`, newPedido)
            .then(resp => {
                res.json(true);
                axios.post(`https://apiemagrecendo.com/pedidos/addVendaVendedor?vendedor=${vendedor}`, newPedido)
                .then(resp=>{
                    res.status(200).json({
                        success: true,
                        message: "Pedido registrado com sucesso",
                    });
                })
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })
    }

    adicionarDividasGerais(req, res){
        const idDoVendedor = cache.get(req.Id_User);
        const idCripted = req.Id_User;
        res.render('vendedores/vendas/dividasGerais/adicionarVenda', { idDoVendedor, idCripted });
    }

    dividasPedidos(req, res){
        const idDoVendedor = cache.get(req.Id_User);
        const idCripted = req.Id_User;
        res.render('vendedores/vendas/dividasPedidos', { idDoVendedor, idCripted });
    }

    entregasConcluidas(req, res){
        const idDoVendedor = cache.get(req.Id_User);
        const idCripted = req.Id_User;
        res.render('vendedores/vendas/entregasConcluidas', { idDoVendedor, idCripted });
    }

    todosUsuariosVendedor(req, res){
        const idVendedor = cache.get(req.query.idVendedor);
        
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
        const idCripted = req.Id_User;

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
                res.redirect(`https://sistemaemagrecendo.com/vendedores/vendasEfetuadas?user=${idCripted}`)
            })
            .catch(err => {
                res.json(false)
            })
    }
}

module.exports = new VendedoresController;