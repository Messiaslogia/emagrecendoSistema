const express = require('express');
const router = express.Router();
const ApiControllerPedidos = require("../controller/ApiControllerPedidos");

router.post('/addPedidos', ApiControllerPedidos.addPedidos);

router.get('/dellPedidos/:pedidos', ApiControllerPedidos.dellPedidos);
router.get('/todosPedidos', ApiControllerPedidos.allPedidos);
router.get('/quantidadeTotal', ApiControllerPedidos.quantidadeTotal);
router.get('/valorTotalPedido', ApiControllerPedidos.consultTotal);

module.exports = router