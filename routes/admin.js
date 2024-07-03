const express = require('express');
const multer = require('multer'); // Para lidar com uploads de arquivos
const router = express.Router();
const AdminController = require("../controller/AdminController");
const verifyToken  = require("../controller/token");

 
/* GET admin listing. */
router.get('/usuarios', verifyToken, AdminController.usuariosIndex);

// GET Produtos
router.get('/produtos', verifyToken, AdminController.produtoIndex);
router.get('/produtos/brindes',verifyToken, AdminController.brindesIndex);
router.get('/produtos/materiais', verifyToken, AdminController.materiaisIndex);




// GET Index Adicionar Produto e Usuario
router.get('/adicionarUsuario', verifyToken, AdminController.adicionarUsuario);
router.get('/adicionarProduto', verifyToken, AdminController.adicionarProduto);


// GET financeiro listing
router.get('/financeiro', verifyToken, AdminController.financeiroIndex);
router.get('/dividas', verifyToken, AdminController.dividasIndex);
router.get('/vendas', verifyToken, AdminController.vendasIndex);
router.get('/devedores', verifyToken, AdminController.devedoresIndex);
router.get('/entregas', verifyToken, AdminController.entregasIndex);
router.get('/adicionarDivida', verifyToken, AdminController.adicionarDivida);


// GET Pedidos listing
router.get('/pedidos', verifyToken, AdminController.pedidosIndex);
router.get('/efetuarPedido', verifyToken, AdminController.efetuarPedido);
router.get('/pedidosConcluidos', verifyToken, AdminController.pedidosConcluidos);
router.get('/aprovarPedido', verifyToken, AdminController.aprovarPedido);
router.get('/pedidoEnviado', verifyToken, AdminController.pedidoEnviado);




module.exports = router;
