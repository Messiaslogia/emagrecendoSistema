const express = require('express');
const multer = require('multer'); // Para lidar com uploads de arquivos
const router = express.Router();
const BrindesController = require("../controller/ApiControllerBrindes.js");

router.get('/adicionarBrindes', BrindesController.indexAdicionarBrinde);


router.post('/adicionarBrindes', BrindesController.uploadImagemProduto(), BrindesController.addBrinde); 
router.post('/editarBrinde', BrindesController.uploadImagemProduto(), BrindesController.editBrinde); 


module.exports = router