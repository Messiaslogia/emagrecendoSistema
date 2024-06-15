const express = require('express');
const multer = require('multer'); // Para lidar com uploads de arquivos
const router = express.Router();
const BrindesController = require("../controller/ApiControllerBrindes.js");

router.get('/adicionarBrindes', BrindesController.indexAdicionarBrinde);
router.get('/editarProduto/:idBrinde', BrindesController.indexEditBrinde);
router.get('/dellProduto/:id', BrindesController.deletandoBrinde)


router.post('/adicionarBrindes', BrindesController.uploadImagemProduto(), BrindesController.addBrinde); 
router.post('/editProduto/:id', BrindesController.uploadImagemProduto(), BrindesController.editBrinde); 


module.exports = router