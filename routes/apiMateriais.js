const express = require('express');
const multer = require('multer'); // Para lidar com uploads de arquivos
const router = express.Router();
const verifyToken  = require("../controller/token");

const ApiControllerProdutos = require("../controller/ApiProdutosController");
const MateriaisController = require("../controller/ApiControllerMateriais.js");

router.get('/adicionarMateriais', verifyToken, MateriaisController.indexAdicionarMaterial);
router.get('/editarProduto/:idMateriais', verifyToken, MateriaisController.indexEditMaterial);
router.get('/dellProduto/:id', verifyToken, MateriaisController.deletandoMaterial)


router.post('/adicionarMateriais', verifyToken, ApiControllerProdutos.uploadImagemProduto() ,MateriaisController.addMaterial); 
router.post('/editProduto/:id', verifyToken, ApiControllerProdutos.uploadImagemProduto(), MateriaisController.editMaterial); 


module.exports = router