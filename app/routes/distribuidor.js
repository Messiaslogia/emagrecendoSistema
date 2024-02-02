const express = require('express');
const router = express.Router();

var DistribuidorController = require('../controller/DistribuidorController');

router.get('/', DistribuidorController.distribuidorIndex);
router.get('/usuarios', DistribuidorController.usuarios);
router.get('/vendas', DistribuidorController.vendas);
router.get('/pedidos', DistribuidorController.pedidos);
router.get('/adicionarUsuario', DistribuidorController.adicionarUsuario);
router.get('/efetuarPedido', DistribuidorController.efetuarPedido);
router.get('/pedidosConcluidos', DistribuidorController.pedidosConcluidos);
router.get('/aprovarPedido', DistribuidorController.aprovarPedido);
router.get('/vendasEfetuadas', DistribuidorController.vendasEfetuadas);
router.get('/dividasPedidos', DistribuidorController.dividasPedidos);
router.get('/entregasConcluidas', DistribuidorController.entregasConcluidas);

// DISTRIBUIDOR
router.get("/todosRepresentantes", DistribuidorController.todosRepresentantes);
router.get("/todosUsuariosDistribuidores", DistribuidorController.todosUsuariosDistribuidores);
router.get("/usuarioPedidos", DistribuidorController.usuarioPedidos);









module.exports = router;