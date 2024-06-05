const express = require('express');
const router = express.Router();

var DistribuidorController = require('../controller/DistribuidorController');

router.get('', DistribuidorController.distribuidorIndex);
router.get('/usuarios', DistribuidorController.usuarios);
router.get('/vendas', DistribuidorController.vendas);
router.get('/pedidos', DistribuidorController.pedidos);
router.get('/adicionarUsuario', DistribuidorController.adicionarUsuario);
router.get('/adicionarDividaGeral', DistribuidorController.adicionarDividaGeral);
router.get('/adicionarVendas', DistribuidorController.adicionarVenda);
router.get('/editarUsuario/:id', DistribuidorController.editIndex)

router.post('/adicionarVendas', DistribuidorController.adicionarVendaPost);
router.post('/edit/:id', DistribuidorController.editUser)

router.get('/efetuarPedido', DistribuidorController.efetuarPedido);
router.get('/pedidosConcluidos', DistribuidorController.pedidosConcluidos);
router.get('/aprovarPedido', DistribuidorController.aprovarPedido);
router.get('/vendasRegistro', DistribuidorController.indexVendas);
router.get('/dividasGerais', DistribuidorController.vendasEfetuadas);
router.get('/dividasPedidos', DistribuidorController.dividasPedidos);
router.get('/entregasConcluidas', DistribuidorController.entregasConcluidas);


// DISTRIBUIDOR
router.get("/todosRepresentantes", DistribuidorController.todosRepresentantes);
router.get("/todosUsuariosDistribuidores", DistribuidorController.todosUsuariosDistribuidores);
router.get("/usuarioPedidos", DistribuidorController.usuarioPedidos);
router.get("/dellUser/:id", DistribuidorController.dellUser);









module.exports = router;