const express = require('express');
const multer = require('multer'); // Para lidar com uploads de arquivos
const router = express.Router();
const MateriaisController = require("../controller/ApiControllerMateriais.js");

router.get('/adicionarMateriais', MateriaisController.indexAdicionarMaterial);
router.get('/editarProduto/:idMateriais', MateriaisController.indexEditMaterial);
router.get('/dellProduto/:id', MateriaisController.deletandoMaterial)


router.post('/adicionarMateriais', MateriaisController.uploadImagemProduto(), MateriaisController.addMaterial); 
router.post('/editProduto/:id', MateriaisController.uploadImagemProduto(), MateriaisController.editMaterial); 


module.exports = router