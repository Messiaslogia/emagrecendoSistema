const express = require('express');
const  router = express.Router();
const VendedoresController = require('../controller/VendedoresController');



router.get('/', VendedoresController.vendedorIndex);
router.get('/clientes', VendedoresController.clientes);
router.get('/futurosUsuarios', VendedoresController.futurosClientes);
router.get('/vendas', VendedoresController.vendas);
router.get('/pedidos', VendedoresController.pedidos);

router.get('/adicionarUsuario', VendedoresController.adicionarUsuario);



module.exports = router;