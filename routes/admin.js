const express = require('express');
const multer = require('multer'); // Para lidar com uploads de arquivos
const router = express.Router();
const AdminController = require("../controller/AdminController")


/* GET admin listing. */
router.get('/produtos', AdminController.produtoIndex);
router.get('/usuarios', AdminController.usuariosIndex);


// GET Index Adicionar Produto e Usuario
router.get('/adicionarUsuario', AdminController.adicionarUsuario);
router.get('/adicionarProduto', AdminController.adicionarProduto);


// GET financeiro listing
router.get('/financeiro', AdminController.financeiroIndex)
router.get('/dividas', AdminController.dividasIndex)
router.get('/vendas', AdminController.vendasIndex)
router.get('/devedores', AdminController.devedoresIndex)
router.get('/entregas', AdminController.entregasIndex)
router.get('/adicionarDivida', AdminController.adicionarDivida)


// GET Pedidos listing
router.get('/pedidos', AdminController.pedidosIndex);
router.get('/efetuarPedido', AdminController.efetuarPedido);
router.get('/pedidosConcluidos', AdminController.pedidosConcluidos)
router.get('/aprovarPedido', AdminController.aprovarPedido)
router.get('/pedidoEnviado', AdminController.pedidoEnviado)




module.exports = router;
