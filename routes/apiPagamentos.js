const express = require('express');
const router = express.Router();
const ApiControllerPagamentos = require("../controller/ApiControllerVendas");

router.get('/todasVendas', ApiControllerPagamentos.vendasTotais);

module.exports = router