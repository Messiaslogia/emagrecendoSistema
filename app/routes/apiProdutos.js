const express = require('express');
const router = express.Router();
const ApiControllerProdutos = require("../controller/ApiProdutosController")


router.get("/todosProdutos", ApiControllerProdutos.allProdutos);




router.post("/adicionarProduto", ApiControllerProdutos.uploadImagemProduto(), ApiControllerProdutos.addProduto);
router.get("/dellProduto/:id", ApiControllerProdutos.dellProduto);

// router.post("/login", ApiControllerProdutos);
// router.post("/novoUser", ApiControllerProdutos);

module.exports = router