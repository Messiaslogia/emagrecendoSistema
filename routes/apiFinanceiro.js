const express = require('express');


const router = express.Router();
const ApiControllerFinanceiro = require("../controller/ApiFinanceiro");

router.get('/relatorioSemanal', ApiControllerFinanceiro.getInfoSemanais);
router.get('/relatorioMensal', ApiControllerFinanceiro.getInfoMensais);
router.get('/todasVendas', ApiControllerFinanceiro.getTodosRelatorios);
router.get('/consultarRelatorio/:numero', ApiControllerFinanceiro.consultandorelatorio);

// ROUTER DEVEDORES
router.get('/todosDevedores', ApiControllerFinanceiro.todosDevedores);

// ROUTER ENTREGAS
router.get('/todasEntregas', ApiControllerFinanceiro.todasEntregas);




module.exports = router;
