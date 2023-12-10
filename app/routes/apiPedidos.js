const express = require('express');
const router = express.Router();
const ApiControllerPedidos = require("../controller/ApiControllerPedidos");

router.post('/addPedidos', ApiControllerPedidos.addPedidos)

router.get('/todosPedidos', ApiControllerPedidos.allPedidos)

module.exports = router