const express = require('express');
const router = express.Router();
const ApiControllerDividas = require("../controller/ApiDividas");

router.get('/todasDividas', ApiControllerDividas.dividasTotais);

module.exports = router