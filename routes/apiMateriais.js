const express = require('express');
const multer = require('multer'); // Para lidar com uploads de arquivos
const router = express.Router();
const verifyToken  = require("../controller/token");

const MateriaisController = require("../controller/ApiControllerMateriais.js");

router.get('/adicionarMateriais', verifyToken, MateriaisController.indexAdicionarMaterial);
router.get('/editarProduto/:idMateriais', verifyToken, MateriaisController.indexEditMaterial);
router.get('/dellProduto/:id', verifyToken, MateriaisController.deletandoMaterial)


router.post('/adicionarMateriais', verifyToken,  MateriaisController.addMaterial); 
router.post('/editProduto/:id', verifyToken,  MateriaisController.editMaterial); 


module.exports = router