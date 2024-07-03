const express = require('express');
const router = express.Router();
const verifyToken  = require("../controller/token");

const ApiControllerProdutos = require("../controller/ApiProdutosController")


router.get("/valorTotal", ApiControllerProdutos.valorTotalProdutos);
router.get("/valorTotalBrindes", ApiControllerProdutos.valorTotalBrindes);
router.get("/valorTotalMateriais", ApiControllerProdutos.valorTotalMateriais);
router.get("/todoEstoque", ApiControllerProdutos.estoqueTotal);
router.get("/todoEstoqueBrindes", ApiControllerProdutos.todoEstoqueBrindes);
router.get("/todoEstoqueMateriais", ApiControllerProdutos.todoEstoqueMateriais);
router.get("/dellProduto/:id", verifyToken, ApiControllerProdutos.dellProduto);
router.get("/editarProduto/:id", verifyToken, ApiControllerProdutos.editIndex);
router.get("/consultProduto/:id", ApiControllerProdutos.consultProduto)
router.get("/todosProdutosForm", ApiControllerProdutos.todosProdutos)
router.get("/todosProdutos", ApiControllerProdutos.allProdutos);
router.get("/todosProdutosBrindes", ApiControllerProdutos.todosProdutosBrindes);
router.get("/todosProdutosMateriais", ApiControllerProdutos.todosProdutosMateriais);



router.post("/adicionarProduto",ApiControllerProdutos.uploadImagemProduto(), ApiControllerProdutos.addProduto);
router.post("/editProduto/:id", ApiControllerProdutos.uploadImagemProduto(), ApiControllerProdutos.editProdutos)

module.exports = router