const express = require('express');
const router = express.Router();
const verifyToken  = require("../controller/token");

var DistribuidorController = require('../controller/DistribuidorController');

router.get('', verifyToken, DistribuidorController.distribuidorIndex);
router.get('/usuarios', verifyToken, DistribuidorController.usuarios);
router.get('/vendas', verifyToken, DistribuidorController.vendas);
router.get('/pedidos', verifyToken, DistribuidorController.pedidos);
router.get('/adicionarUsuario', verifyToken, DistribuidorController.adicionarUsuario);
router.get('/adicionarDividaGeral', verifyToken, DistribuidorController.adicionarDividaGeral);
router.get('/adicionarVendas', verifyToken, DistribuidorController.adicionarVenda);
router.get('/editarUsuario/:id', verifyToken, DistribuidorController.editIndex)

router.post('/adicionarVendas', verifyToken, DistribuidorController.adicionarVendaPost);
router.post('/edit/:id', verifyToken, DistribuidorController.editUser)

router.get('/efetuarPedido', verifyToken, DistribuidorController.efetuarPedido);
router.get('/pedidosConcluidos', verifyToken, DistribuidorController.pedidosConcluidos);
router.get('/aprovarPedido', verifyToken, DistribuidorController.aprovarPedido);
router.get('/vendasRegistro', verifyToken, DistribuidorController.indexVendas);
router.get('/dividasGerais', verifyToken, DistribuidorController.vendasEfetuadas);
router.get('/dividasPedidos', verifyToken, DistribuidorController.dividasPedidos);
router.get('/entregasConcluidas', verifyToken, DistribuidorController.entregasConcluidas);


// DISTRIBUIDOR
router.get("/todosRepresentantes", DistribuidorController.todosRepresentantes);
router.get("/todosUsuariosDistribuidores", DistribuidorController.todosUsuariosDistribuidores);
router.get("/usuarioPedidos", DistribuidorController.usuarioPedidos);
router.get("/dellUser/:id", verifyToken, DistribuidorController.dellUser);









module.exports = router;