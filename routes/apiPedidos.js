const express = require('express');
const router = express.Router();
const verifyToken  = require("../controller/token");

const ApiControllerPedidos = require("../controller/ApiControllerPedidos");


router.post('/addPedidos',  ApiControllerPedidos.addPedidos);
router.post('/novoStatus', ApiControllerPedidos.newStatus);
router.post('/statusEntrega', verifyToken, ApiControllerPedidos.novaEntrega)

router.get('/dellPedidos/:pedidos', ApiControllerPedidos.dellPedidos);
router.get('/todosPedidos', ApiControllerPedidos.allPedidos);
router.get('/todosPedidosAceitos', ApiControllerPedidos.allPedidosAceitos);
router.get('/todosPedidosEntregues', ApiControllerPedidos.allPedidosEntregues);
router.get('/statusEntregas/:numero/:id', verifyToken, ApiControllerPedidos.enviarProdutoIndex)

router.get('/quantidadeTotal', ApiControllerPedidos.quantidadeTotal);
router.get('/valorTotalPedido', ApiControllerPedidos.consultTotal);
router.get('/casesEntregas', ApiControllerPedidos.casesEntregas);
router.get('/valorPedidosAprovados', ApiControllerPedidos.casesPedidosAprovados);

router.get('/quantidadePedidos', ApiControllerPedidos.quantidadeTotaldePedidos);


// Distribuidores
router.get('/todosOsPedidosDistribuidor', ApiControllerPedidos.todosOsPedidosDistribuidor);
router.get('/pedidosAprovadosDistribuidor', ApiControllerPedidos.pedidosAprovadosDistribuidor);


// Vendedor 
router.get('/pedidosAprovadosVendedor', ApiControllerPedidos.pedidosAprovadosVendedor);
router.get('/todosOsPedidosVendedor', ApiControllerPedidos.todosOsPedidosVendedor);

module.exports = router