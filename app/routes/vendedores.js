const express = require('express');
const  router = express.Router();
const VendedoresController = require('../controller/VendedoresController');



router.get('/', VendedoresController.vendedorIndex);
router.get('/clientes', VendedoresController.clientes);
router.get('/futurosUsuarios', VendedoresController.futurosClientes);
router.get('/vendas', VendedoresController.vendas);
router.get('/pedidos', VendedoresController.pedidos);
router.get('/efetuarPedido', VendedoresController.efetuarPedido);
router.get('/pedidosConcluidos', VendedoresController.pedidosConcluidos);
router.get('/aprovarPedido', VendedoresController.aprovarPedido);
router.get('/vendasEfetuadas', VendedoresController.vendasEfetuadas);
router.get('/dividasPedidos', VendedoresController.dividasPedidos);
router.get('/entregasConcluidas', VendedoresController.entregasConcluidas);

router.get('/adicionarUsuario', VendedoresController.adicionarUsuario);
router.get('/adiconarDividasGerais', VendedoresController.adicionarDividasGerais);
router.get('/todosUsuariosVendedor', VendedoresController.todosUsuariosVendedor);
router.get('/usuarioPedidos', VendedoresController.todosUsuariosVendedor)




module.exports = router;