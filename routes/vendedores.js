const express = require('express');
const  router = express.Router();
const VendedoresController = require('../controller/VendedoresController');
const verifyToken  = require("../controller/token");



router.get('', verifyToken, VendedoresController.vendedorIndex);
router.get('/clientes', verifyToken, VendedoresController.clientes);
router.get('/futurosUsuarios', verifyToken, VendedoresController.futurosClientes);
router.get('/vendas', verifyToken, VendedoresController.vendas);
router.get('/pedidos', verifyToken, VendedoresController.pedidos);
router.get('/efetuarPedido', verifyToken, VendedoresController.efetuarPedido);
router.get('/pedidosConcluidos', verifyToken, VendedoresController.pedidosConcluidos);
router.get('/aprovarPedido', verifyToken, VendedoresController.aprovarPedido);
router.get('/dividasGeraisVendedor', verifyToken, VendedoresController.dividasGerais)
router.get('/vendasEfetuadas', verifyToken, VendedoresController.vendasEfetuadas);
router.get('/dividasPedidos', verifyToken, VendedoresController.dividasPedidos);
router.get('/entregasConcluidas', verifyToken, VendedoresController.entregasConcluidas);
router.get('/dellUser/:id', verifyToken, VendedoresController.dellCliente)

router.get('/editUser/:id', verifyToken, VendedoresController.editIndex);
router.post("/edit/:id", verifyToken, VendedoresController.editUser);

router.get('/adicionarUsuario', verifyToken,  VendedoresController.adicionarUsuario);
router.get('/adiconarVendas', verifyToken, VendedoresController.adicionarVendas);
router.get('/adiconarDividasGerais', verifyToken, VendedoresController.adicionarDividasGerais);
router.get('/todosUsuariosVendedor', VendedoresController.todosUsuariosVendedor);
router.get('/usuarioPedidos', verifyToken, VendedoresController.todosUsuariosVendedor);

router.post('/addPedidos', verifyToken, VendedoresController.registrarPedidos);
router.post('/adicionarVendas', verifyToken, verifyToken, VendedoresController.registrarVendas);




module.exports = router;