const express = require('express');
const multer = require('multer'); // Para lidar com uploads de arquivos
const router = express.Router();
const BrindesController = require("../controller/ApiControllerBrindes.js");
const verifyToken  = require("../controller/token");


router.get('/adicionarBrindes', verifyToken, BrindesController.indexAdicionarBrinde);
router.get('/editarProduto/:idBrinde', verifyToken, BrindesController.indexEditBrinde);
router.get('/dellProduto/:id', verifyToken, BrindesController.deletandoBrinde)


router.post('/adicionarBrindes', verifyToken,  BrindesController.uploadImagemProduto(), BrindesController.addBrinde); 
router.post('/editProduto/:id', verifyToken, BrindesController.uploadImagemProduto(), BrindesController.editBrinde); 


module.exports = router