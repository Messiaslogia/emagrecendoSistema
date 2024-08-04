const express = require('express');
const multer = require('multer'); // Adicione o multer
const verifyToken  = require("../controller/token");


const router = express.Router();
const ApiControllerDividas = require("../controller/ApiDividas");

// Configuração do Multer
const upload = multer();

router.get('/todasDividas', verifyToken, ApiControllerDividas.dividasTotais);
router.get('/dividasAdmin', verifyToken, ApiControllerDividas.dividasAdmin);
router.get('/deletarDivida/:id', verifyToken, ApiControllerDividas.deletarDivida);
router.get('/deletarDividaDistribuidor/:id', ApiControllerDividas.deletarDividaDistribuidor);
router.get('/deletarDividaVendedor/:id', ApiControllerDividas.deletarDividaVendedor);

router.get("/editarDividaForm/:id", verifyToken, ApiControllerDividas.editarDividaForm);
router.get("/editarDividaFormDistribuidor/:id", ApiControllerDividas.editarDividaFormDistribuidor);
router.get("/editarDividaFormVendedor/:id", ApiControllerDividas.editarDividaFormVendedor);
router.get("/consultarDivida/:id", ApiControllerDividas.consultarDivida);

router.post('/adicionarNovaDivida', verifyToken, ApiControllerDividas.adicionarDivida);
router.post('/addNovaDivida', verifyToken, ApiControllerDividas.addNovaDivida);
router.post('/adicionarNovaDividaVendedor', ApiControllerDividas.adicionarDividaVendedor);
router.post('/adicionarNovaDividaDistribuidor', ApiControllerDividas.adicionarDividaDistribuidor);
router.post("/editarDivida/", verifyToken, ApiControllerDividas.editarDivida);
router.post("/editarDividaDistribuidor/:id", ApiControllerDividas.editarDividaDistribuidor);
router.post("/editarDividaVendedor/:id", ApiControllerDividas.editarDividaVendedor);








module.exports = router;
