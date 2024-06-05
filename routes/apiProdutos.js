const express = require('express');
const router = express.Router();
const ApiControllerProdutos = require("../controller/ApiProdutosController")


router.get("/valorTotal", ApiControllerProdutos.valorTotalProdutos);
router.get("/todoEstoque", ApiControllerProdutos.estoqueTotal);
router.get("/dellProduto/:id", ApiControllerProdutos.dellProduto);
router.get("/editarProduto/:id", ApiControllerProdutos.editIndex);
router.get("/consultProduto/:id", ApiControllerProdutos.consultProduto)
router.get("/todosProdutosForm", ApiControllerProdutos.todosProdutos)
router.get("/todosProdutos", ApiControllerProdutos.allProdutos);



router.post("/adicionarProduto", ApiControllerProdutos.addProduto);
router.post("/editProduto/:id", ApiControllerProdutos.editProdutos)

module.exports = router