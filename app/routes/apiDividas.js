const express = require('express');
const multer = require('multer'); // Adicione o multer

const router = express.Router();
const ApiControllerDividas = require("../controller/ApiDividas");

// Configuração do Multer
const upload = multer();

router.get('/todasDividas', ApiControllerDividas.dividasTotais);
router.get('/deletarDivida/:id', ApiControllerDividas.deletarDivida);
router.get('/deletarDividaDistribuidor/:id', ApiControllerDividas.deletarDividaDistribuidor);
router.get('/deletarDividaVendedor/:id', ApiControllerDividas.deletarDividaVendedor);

router.get("/editarDividaForm/:id", ApiControllerDividas.editarDividaForm);
router.get("/consultarDivida/:id", ApiControllerDividas.consultarDivida);


router.post('/adicionarNovaDivida', upload.none(), ApiControllerDividas.adicionarDivida);
router.post('/adicionarNovaDividaVendedor', ApiControllerDividas.adicionarDividaVendedor);
router.post('/adicionarNovaDividaDistribuidor', ApiControllerDividas.adicionarDividaDistribuidor);
router.post("/editarDivida/:id", ApiControllerDividas.editarDivida);






module.exports = router;
